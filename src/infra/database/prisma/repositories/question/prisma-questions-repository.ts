import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { PrismaQuestionMapper } from '../../mappers/prisma-question-mapper';
import { Question } from '@/domain/forum/enterprise/entities/question/question';
import { QuestionsRepository } from '@/domain/forum/application/repositories/question/questions-repository';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question/question-attachments-repository';
import { CacheRepository } from '@/infra/cache/cache-repositor';

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(
    private prisma: PrismaService,
    private cache: CacheRepository,
    private questionAttachmentsRepository: QuestionAttachmentsRepository,
  ) {}

  async create(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.create({
      data,
    });

    await this.questionAttachmentsRepository.createMany(
      question.attachments.getItems(),
    );
  }

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    });

    if (!question) {
      return null;
    }

    return PrismaQuestionMapper.toDomain(question);
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const cacheHit = await this.cache.get(`question:${slug}`);
    if (cacheHit) {
      const cacheData = JSON.parse(cacheHit);
      return cacheData;
    }

    const response = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    });

    if (!response) {
      return null;
    }

    const question = PrismaQuestionMapper.toDomain(response);

    await this.cache.set(`question:${slug}`, JSON.stringify(question));
    return question;
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return questions.map((question) => PrismaQuestionMapper.toDomain(question));
  }

  async save(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await Promise.all([
      this.prisma.question.update({
        data,
        where: {
          id: data.id,
        },
      }),

      this.questionAttachmentsRepository.createMany(
        question.attachments.getNewItems(),
      ),

      this.questionAttachmentsRepository.deleteMany(
        question.attachments.getRemovedItems(),
      ),

      this.cache.delete(`question:${data.slug}`),
    ]);
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPrisma(question);

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    });
  }
}
