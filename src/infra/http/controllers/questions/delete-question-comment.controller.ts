import {
  Param,
  Delete,
  HttpCode,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { DeleteQuestionCommentUseCase } from '@/domain/forum/application/use-cases/question/delete-question-comment';

@Controller('question/comments/:id')
export class DeleteQuestionCommentController {
  constructor(private deleteQuestion: DeleteQuestionCommentUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(
    @UserDecorator() user: payloadSchema,
    @Param('id') questionCommentId: string,
  ) {
    const userId = user.sub;

    const result = await this.deleteQuestion.execute({
      authorId: userId,
      questionCommentId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
