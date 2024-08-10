import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { Attachment as PrismaAttachment } from '@prisma/client';

export class PrismaQuestionAttachmentMapper {
  static toDomain(raw: PrismaAttachment): QuestionAttachment {
    if (!raw.question_id) {
      throw new Error('Invalid Attachment type.');
    }

    return QuestionAttachment.create({
      questionId: new UniqueEntityID(raw.question_id?.toString()),
      attachmentId: new UniqueEntityID(raw.id),
    });
  }
}
