import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Answer } from '@/domain/forum/enterprise/entities/answer/answer';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { PrismaAnswerMapper } from '../../mappers/prisma-answer-mapper';
import { AnswersRepository } from '@/domain/forum/application/repositories/answer/answers-repository';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer/answer-attachments-repository';

@Injectable()
export class PrismaAnswerRepository implements AnswersRepository {
  constructor(
    private prisma: PrismaService,
    private answerAttachmentRepository: AnswerAttachmentsRepository
  ) {}

  async findById(id: string): Promise<Answer | null> {
    const answer = await this.prisma.answer.findUnique({
      where: {
        id,
      },
    });

    if (!answer) {
      return null;
    }

    return PrismaAnswerMapper.toDomain(answer);
  }

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = await this.prisma.answer.findMany({
      where: {
        question_id: questionId,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return answers.map((question) => PrismaAnswerMapper.toDomain(question));
  }

  async create(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.create({
      data,
    });

    await this.answerAttachmentRepository.createMany(
      answer.attachments.getItems()
    )

  }

  async save(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await Promise.all([
      this.prisma.answer.update({
        data,
        where: {
          id: data.id,
        },
      }),
  
      this.answerAttachmentRepository.createMany(
        answer.attachments.getNewItems()
      ),
  
      this.answerAttachmentRepository.deleteMany(
        answer.attachments.getRemovedItems()
      )
    ])
  }

  async delete(answer: Answer): Promise<void> {
    const data = PrismaAnswerMapper.toPrisma(answer);

    await this.prisma.answer.delete({
      where: {
        id: data.id,
      },
    });
  }
}
