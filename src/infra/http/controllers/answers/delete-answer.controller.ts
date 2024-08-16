import {
  Param,
  Delete,
  HttpCode,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/answer/delete-answer';

@Controller('/answer/:id')
export class DeleteAnswerController {
  constructor(private answer: DeleteAnswerUseCase) {}

  @Delete()
  @HttpCode(204)
  async Handle(
    @UserDecorator() user: payloadSchema,
    @Param('id') answerId: string,
  ) {
    const userId = user.sub;

    const result = await this.answer.execute({
      answerId,
      authorId: userId,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
