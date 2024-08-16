import { Get, Query, Controller, BadRequestException } from '@nestjs/common';

import {
  PageQueryParamsSchema,
  queryValidationPipe
} from '../../interface/rest/list-question.dto';

import { QuestionPresenter } from '../../presenters/question-presenter';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/fetch-recent-questions';


@Controller('/question')
export class FetchRecentQuestionsController {
  constructor(private fetchRecenteQuestions: FetchRecentQuestionsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
  ) {
    const result = await this.fetchRecenteQuestions.execute({
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const questions = result.value.questions;

    return { questions: questions.map(QuestionPresenter.toHTTP) };
  }
}
