import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { PrismaQuestionAttachmentMapper } from '../../mappers/prisma-question-attachment-mapper';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question/question-attachments-repository';

@Injectable()
export class PrismaQuestionsAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}

  async findManyByQuestionId(
    questionId: string,
  ): Promise<QuestionAttachment[]> {
    const questionsAttachments = await this.prisma.attachment.findMany({
      where: {
        question_id: questionId,
      },
    });

    return questionsAttachments.map((questionsAttachment) =>
      PrismaQuestionAttachmentMapper.toDomain(questionsAttachment),
    );
  }

  async deleteManyByQuestionId(questionId: string): Promise<void> {
    await this.prisma.attachment.delete({
      where: {
        id: questionId,
      },
    });
  }
}
