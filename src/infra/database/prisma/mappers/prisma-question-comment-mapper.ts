import { Prisma, Comment as PrismaComment } from '@prisma/client';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment';

export class PrismaQuestionCommentMapper {
  static toDomain(raw: PrismaComment): QuestionComment {
    if (!raw.question_id) {
      throw new Error('Invalid Comment type.');
    }

    return QuestionComment.create(
      {
        authorId: new UniqueEntityID(raw.author_id),
        questionId: new UniqueEntityID(raw.question_id?.toString()),
        content: raw.content,
        createdAt: raw.created_at,
        updatedAt: raw.updated_at,
      },
      new UniqueEntityID(raw.id),
    );
  }

  static toPrisma(
    question: QuestionComment,
  ): Prisma.CommentUncheckedCreateInput {
    return {
      id: question.id.toString(),
      content: question.content,
      question_id: question.questionId.toString(),
      author_id: question.authorId.toString(),
      created_at: question.createdAt,
      updated_at: question.updatedAt,
    };
  }
}
