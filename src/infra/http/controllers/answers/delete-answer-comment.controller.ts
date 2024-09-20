import {
  Param,
  Delete,
  HttpCode,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { DeleteAnswerCommentUseCase } from '@/domain/forum/application/use-cases/answer/delete-answer-comment';

@Controller('/answer/comments/:id')
export class DeleteAnswersCommentController {
  constructor(private answerComment: DeleteAnswerCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @UserDecorator() user: payloadSchema,
    @Param('id') answerCommentId: string,
  ) {
    const userId = user.sub;
    const result = await this.answerComment.execute({
      authorId: userId,
      answerCommentId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
