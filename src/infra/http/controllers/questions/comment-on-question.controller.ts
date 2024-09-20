import { z } from 'zod';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
} from '@nestjs/common';
import { CommentOnQuestionUseCase } from '@/domain/forum/application/use-cases/question/comment-on-question';

const commentOnQuestionBodSchema = z.object({
  content: z.string(),
});

const bodyValidationPipe = new ZodValidationPipe(commentOnQuestionBodSchema);

type CommentOnQuestionBodSchema = z.infer<typeof commentOnQuestionBodSchema>;

@Controller('/question/:questionId/comments')
export class CommentOnQuestionController {
  constructor(private commentOnQuestion: CommentOnQuestionUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CommentOnQuestionBodSchema,
    @UserDecorator() user: payloadSchema,
    @Param('questionId') questionId: string,
  ) {
    const userId = user.sub;
    const { content } = body;

    const result = await this.commentOnQuestion.execute({
      authorId: userId,
      questionId,
      content,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
