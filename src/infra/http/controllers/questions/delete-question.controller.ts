import {
  Param,
  Delete,
  HttpCode,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/question/delete-question';

@Controller('/question/:id')
export class DeleteQuestionController {
  constructor(private deleteQuestion: DeleteQuestionUseCase) {}

  @Delete()
  @HttpCode(204)
  async Handle(
    @UserDecorator() user: payloadSchema,
    @Param('id') questionId: string,
  ) {
    const userId = user.sub;

    const result = await this.deleteQuestion.execute({
      authorId: userId,
      questionId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}