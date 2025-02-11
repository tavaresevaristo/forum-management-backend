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

import { CommentWithAuthorPresenter } from '../../presenters/comment-with-author-presenter';
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/question/fetch-question-comments';

@Controller('/question/:id/comments')
export class FetchQuestionCommentsController {
  constructor(private fetchQuestionComments: FetchQuestionCommentsUseCase) {}

  @Get()
  async handle(
    @Query('page', queryValidationPipe) page: PageQueryParamsSchema,
    @Param('id') questionId: string,
  ) {
    const result = await this.fetchQuestionComments.execute({
      page,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    const comments = result.value.comments;

    return { comments: comments.map(CommentWithAuthorPresenter.toHttp) };
  }
}
