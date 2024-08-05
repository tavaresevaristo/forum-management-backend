import { Question as PrismaQuestion, Prisma } from '@prisma/client';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { Question } from '@/domain/forum/enterprise/entities/question';
import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug';

export class PrismaQuestionMapper {
  static toDomain(raw: PrismaQuestion): Question {
    return Question.create(
      {
        title: raw.title,
        content: raw.content,
        attachments: undefined,
        createdAt: raw.created_at,
        slug: Slug.create(raw.slug),
        authorId: new UniqueEntityID(raw.author_id),
        updatedAt: raw.updated_at ? new Date(raw.updated_at) : null,
        bestAnswerId: raw.best_answer_id
          ? new UniqueEntityID(raw.best_answer_id)
          : null,
      },
      new UniqueEntityID(raw.id),
    );
  }


  static toPrisma(question: Question): Prisma.QuestionUncheckedCreateInput {
    return {
      id: question.id.toString(),
      author_id: question.authorId.toString(),
      best_answer_id: question.bestAnswerId?.toString(),
      content: question.content,
      slug: question.slug.value,
      title: question.title,
      created_at: question.createdAt,
      updated_at: question.updatedAt


    }
  }

}
