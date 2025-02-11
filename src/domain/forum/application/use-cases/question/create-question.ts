import { Injectable } from '@nestjs/common';
import { Either, right } from '@/core/either';
import { UniqueEntityID } from '@/core/entities/unique-entity-id';
import { QuestionsRepository } from '../../repositories/question/questions-repository';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { QuestionAttachmentList } from '@/domain/forum/enterprise/entities/question-attachment-list';
import { Question } from '@/domain/forum/enterprise/entities/question/question';

interface CreateQuestionUseCaseRequest {
  title: string;
  content: string;
  authorId: string;
  attachmentsIds: string[];
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

@Injectable()
export class CreateQuestionUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    
    const question = Question.create({
      authorId: new UniqueEntityID(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntityID(attachmentId),
        questionId: question.id,
      });
    });

    question.attachments = new QuestionAttachmentList(questionAttachments);

    await this.questionsRepository.create(question);

    return right({
      question,
    });
  }
}
