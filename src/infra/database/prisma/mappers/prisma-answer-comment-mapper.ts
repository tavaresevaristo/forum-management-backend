import { Prisma, Comment as PrismaComment } from '@prisma/client';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';

export class PrismaAnswersCommentMapper {
  static toDomain(raw: PrismaComment): AnswerComment {
    if (!raw.question_id) {
      throw new Error('Invalid Comment type.');
    }

    return AnswerComment.create(
      {
        authorId: new UniqueEntityID(raw.author_id),
        answerId: new UniqueEntityID(raw.answer_id?.toString()),
        content: raw.content,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(answer: AnswerComment): Prisma.CommentUncheckedCreateInput {
    return {
      id: answer.id.toString(),
      answer_id: answer.answerId.toString(),
      content: answer.content.toString(),
      author_id: answer.authorId.toString(),
      created_at: answer.createdAt,
      updated_at: answer.updatedAt,
    };
  }
}
