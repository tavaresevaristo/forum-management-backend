import { Get, Query, Controller, BadRequestException } from '@nestjs/common';

import {
  PageQueryParamsSchema,
  pageQueryParamsSchema,
} from '../../interface/rest/list-question.dto';

import { QuestionPresenter } from '../../presenters/question-presenter';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/fetch-recent-questions';

const queryValidationPipe = new ZodValidationPipe(pageQueryParamsSchema);

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
