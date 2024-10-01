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

  async createMany(attachments: QuestionAttachment[]): Promise<void> {
        
    if (attachments.length === 0) {
      return;
    }

    const data = PrismaQuestionAttachmentMapper.toPrismaUpdateMany(attachments);
    await this.prisma.attachment.updateMany(data);
  }

  async deleteMany(attachments: QuestionAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const attachmentIds = attachments.map((attachment) => {
      return attachment.id.toString();
    });

    await this.prisma.attachment.deleteMany({
      where: {
        id: {
          in: attachmentIds,
        },
      },
    });
  }

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
