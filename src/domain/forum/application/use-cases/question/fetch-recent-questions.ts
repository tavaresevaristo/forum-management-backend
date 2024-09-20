import { Either, right } from '@/core/either';
import { QuestionsRepository } from '../../repositories/question/questions-repository';
import { Injectable } from '@nestjs/common';
import { Question } from '@/domain/forum/enterprise/entities/question/question';

interface FetchRecentQuestionsUseCaseRequest {
  page: number;
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[];
  }
>;

@Injectable()
export class FetchRecentQuestionsUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    page,
  }: FetchRecentQuestionsUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {

    const questions = await this.questionsRepository.findManyRecent({page});

    return right({
      questions,
    });
  }
}