import {
  Put,
  Body,
  Param,
  HttpCode,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/answer/edit-answer';

const createAnswerQuestionBodySchema = z.object({
  content: z.string(),
});
const bodyValidationPipe = new ZodValidationPipe(
  createAnswerQuestionBodySchema,
);
type CreateAnswerQuestionBodySchema = z.infer<
  typeof createAnswerQuestionBodySchema
>;

@Controller('/answer/:id')
export class EditAnswerController {
  constructor(private editAnswer: EditAnswerUseCase) {}

  @Put()
  @HttpCode(204)
  async handle(
    @Body(bodyValidationPipe) body: CreateAnswerQuestionBodySchema,
    @UserDecorator() user: payloadSchema,
    @Param('id') answerId: string,
  ) {
    const { content } = body;
    const userId = user.sub;

    const result = await this.editAnswer.execute({
      content,
      answerId,
      authorId: userId,
      attachmentsIds: [],
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}