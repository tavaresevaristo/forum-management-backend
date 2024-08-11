import {
  bodyValidationPipe,
  EditQuestionBodySchema,
} from '../../interface/rest/edit-question.dto';

import {
  Put,
  Body,
  Param,
  HttpCode,
  Controller,
  BadRequestException,
} from '@nestjs/common';

import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/question/edit-question';

@Controller('/question/:id')
export class EditQuestionController {
  constructor(private editQuestion: EditQuestionUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: EditQuestionBodySchema,
    @UserDecorator() user: payloadSchema,
    @Param('id') questionId: string,
  ) {
    const userId = user.sub;
    const { title, content } = body;

    const result = await this.editQuestion.execute({
      title,
      content,
      questionId,
      authorId: userId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
