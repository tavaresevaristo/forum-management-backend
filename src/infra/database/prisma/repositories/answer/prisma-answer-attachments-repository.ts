import { Injectable } from '@nestjs/common';
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment';
import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer/answer-attachments-repository';

@Injectable()
export class PrismaAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  findManyByAnswerId(answerId: string): Promise<AnswerAttachment[]> {
    throw new Error('Method not implemented.');
  }
  deleteManyByAnswerId(answerId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
