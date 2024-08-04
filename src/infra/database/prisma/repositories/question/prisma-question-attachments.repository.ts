import { Injectable } from '@nestjs/common';
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment';
import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question/question-attachments-repository';

@Injectable()
export class PrismaQuestionsAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]> {
    throw new Error('Method not implemented.');
  }
  deleteManyByQuestionId(questionId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
