import { UniqueEntityID } from "@/core/entities/unique-entity-id";
import { AnswerAttachmentList } from "../answer-attachment-list";

export interface AnswerProps {
  authorId: UniqueEntityID;
  questionId: UniqueEntityID;
  content: string;
  attachments: AnswerAttachmentList;
  createdAt: Date;
  updatedAt?: Date | null;
}