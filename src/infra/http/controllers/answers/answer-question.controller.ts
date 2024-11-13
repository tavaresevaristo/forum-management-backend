import {
  Body,
  Post,
  Param,
  Controller,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question/answer-question';

const createAnswerQuestionBodySchema = z.object({
  content: z.string(),
  attachments: z.array(z.string().uuid()).default([]),
});
const bodyValidationPipe = new ZodValidationPipe(
  createAnswerQuestionBodySchema,
);
type CreateAnswerQuestionBodySchema = z.infer<
  typeof createAnswerQuestionBodySchema
>;

@Controller('/question/:id/answer')
export class AnswerQuestionController {
  constructor(private answerQuestion: AnswerQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateAnswerQuestionBodySchema,
    @UserDecorator() user: payloadSchema,
    @Param('id') questionId: string,
  ) {
    const { content, attachments } = body;
    const userId = user.sub;

    const result = await this.answerQuestion.execute({
      content,
      questionId,
      authorId: userId,
      attachmentsIds: attachments,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
