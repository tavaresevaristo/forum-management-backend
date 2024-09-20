import {
  Get,
  Query,
  Param,
  Controller,
  BadRequestException,
} from '@nestjs/common';

import {
  queryValidationPipe,
  PageQueryParamsSchema,
} from '../../interface/rest/list.dto';

import { CommentPresenter } from '../../presenters/comment-presenter';
import { FetchAnswerCommentsUseCase } from '@/domain/forum/application/use-cases/answer/fetch-answer-comments';

@Controller('/answer/:id/comments')
export class FetchAnswerCommentsController {
  constructor(private fetchAnswerComments: FetchAnswerCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('id') answerId: string,
  ) {
    const result = await this.fetchAnswerComments.execute({
      page,
      answerId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const answerComments = result.value.answerComments;

    return { comments: answerComments.map(CommentPresenter.toHttp) };
  }
}
