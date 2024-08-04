import { Question as PrismaQuestion } from '@prisma/client';
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
        bestAnswerId: undefined,
        createdAt: raw.created_at,
        slug: Slug.create(raw.slug),
        authorId: new UniqueEntityID(raw.author_id),
        updatedAt: new Date(String(raw.updated_at)),
      },
      new UniqueEntityID(raw.id),
    );
  }
}
