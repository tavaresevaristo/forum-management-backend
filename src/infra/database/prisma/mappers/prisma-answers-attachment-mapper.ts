import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { Attachment as PrismaAttachment } from '@prisma/client';

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
}
