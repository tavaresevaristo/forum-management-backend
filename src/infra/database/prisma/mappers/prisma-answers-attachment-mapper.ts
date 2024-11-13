import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { Prisma, Attachment as PrismaAttachment } from '@prisma/client';

export class PrismaAnswerAttachmentMapper {
  static toDomain(raw: PrismaAttachment): AnswerAttachment {
    
    if(!raw.question_id){
      throw new Error("Invalid Attachment type.")
    }
    
    return AnswerAttachment.create({
      answerId: new UniqueEntityID(raw.answer_id?.toString()),
      attachmentId: new UniqueEntityID(raw.id),
    });
  }

  
  static toPrismaUpdateMany(
    attachments: AnswerAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    
    const attachmentIds = attachments.map((attachment) => {
      return attachment.attachmentId.toString();
    });

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        answer_id: attachments[0].answerId.toString(),
      },
    };
  }

}
