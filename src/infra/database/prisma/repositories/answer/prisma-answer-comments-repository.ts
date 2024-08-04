import { Injectable } from '@nestjs/common';
import { PaginationParams } from '@/core/repositories/pagination-params';
import { AnswerComment } from '@/domain/forum/enterprise/entities/answer-comment';
import { AnswerCommentsRepository } from '@/domain/forum/application/repositories/answer/answer-comments-repository';

@Injectable()
export class PrismaAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  findById(id: string): Promise<AnswerComment | null> {
    throw new Error('Method not implemented.');
  }
  findManyByAnswerId(
    answerId: string,
    params: PaginationParams,
  ): Promise<AnswerComment[]> {
    throw new Error('Method not implemented.');
  }
  create(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
  delete(answerComment: AnswerComment): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
