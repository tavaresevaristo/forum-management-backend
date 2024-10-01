import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { PrismaAnswerAttachmentMapper } from '../../mappers/prisma-answers-attachment-mapper';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer/answer-attachments-repository';

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  constructor(private prisma: PrismaService) {}
  async createMany(attachments: AnswerAttachment[]): Promise<void> {
    if (attachments.length === 0) {
      return;
    }

    const data = PrismaAnswerAttachmentMapper.toPrismaUpdateMany(attachments);
    await this.prisma.attachment.updateMany(data);
  }

  async deleteMany(attachments: AnswerAttachment[]): Promise<void> {
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

  async findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    const answerAttachments = await this.prisma.attachment.findMany({
      where: {
        answer_id: answerId,
      },
    });

    return answerAttachments.map((answerAttachment) =>
      PrismaAnswerAttachmentMapper.toDomain(answerAttachment),
    );
  }

  async deleteManyByAnswerId(answerId: string): Promise<void> {
    await this.prisma.attachment.deleteMany({
      where: {
        answer_id: answerId,
      },
    });
  }
}
