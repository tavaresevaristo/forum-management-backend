import { Either, left, right } from '@/core/either';
import { ResourceNotFoundError } from '@/core/errors/errors/resource-not-found-error';
import { QuestionsRepository } from '../../repositories/question/questions-repository';
import { Injectable } from '@nestjs/common';
import { Question } from '@/domain/forum/enterprise/entities/question/question';

interface FetchQuestionBySlugUseCaseRequest {
  slug: string;
}

type FetchQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question;
  }
>;

@Injectable()
export class FetchQuestionBySlugUseCase {
  constructor(private questionsRepository: QuestionsRepository) {}

  async execute({
    slug,
  }: FetchQuestionBySlugUseCaseRequest): Promise<FetchQuestionBySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug);

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    return right({
      question,
    });
  }
}
