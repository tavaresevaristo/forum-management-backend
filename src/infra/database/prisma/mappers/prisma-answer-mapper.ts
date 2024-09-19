import { Answer as AnswerPrisma, Prisma } from '@prisma/client';
import { Answer } from '@/domain/forum/enterprise/entities/answer/answer';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';

export class PrismaAnswerMapper {
  static toDomain(raw: AnswerPrisma): Answer {
    return Answer.create(
      {
        authorId: new UniqueEntityID(raw.author_id),
        questionId: new UniqueEntityID(raw.question_id),
        content: raw.content,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(question: Answer): Prisma.AnswerUncheckedCreateInput {
    return {
      id: question.id.toString(),
      content: question.authorId.toString(),
      question_id: question.questionId.toString(),
      author_id: question.authorId.toString(),
      created_at: question.createdAt,
      updated_at: question.updatedAt,
    };
  }
}
