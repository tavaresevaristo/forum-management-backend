import { Slug } from '../value-objects/slug';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionAttachmentList } from '../question-attachment-list';

export interface QuestionProps {
  slug: Slug;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt?: Date | null;
  authorId: UniqueEntityID;
  attachments: QuestionAttachmentList;
  bestAnswerId?: UniqueEntityID | null;
}
