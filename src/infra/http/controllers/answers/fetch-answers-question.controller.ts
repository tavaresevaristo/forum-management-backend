import {
  Get,
  Param,
  Query,
  Controller,
  BadRequestException,
} from '@nestjs/common';

import {
  queryValidationPipe,
  PageQueryParamsSchema,
} from '../../interface/rest/list-question.dto';
import { AnswerPresenter } from '../../presenters/answer-presenter';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/answer-question/fetch-question-answers';

@Controller('/question/:questionId/answer')
export class FetchQuestionAnswerController {
  constructor(private fetchQuestionAnswers: FetchQuestionAnswersUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionAnswers.execute({
      questionId,
      page,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const answers = result.value.answers;

    return { answers: answers.map((answer) => AnswerPresenter.toHttp(answer)) };
  }
}