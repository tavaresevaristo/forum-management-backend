
import {
  Body,
  Param,
  HttpCode,
  Controller,
  BadRequestException,
  Post
} from '@nestjs/common';
import { z } from 'zod';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe';
import { CommentOnAnswerUseCase } from '@/domain/forum/application/use-cases/answer/comment-on-answer';

const commentOnAnswerBodSchema = z.object({
  content: z.string(),
});
const bodyValidationPipe = new ZodValidationPipe(commentOnAnswerBodSchema);
type CommentOnAnswerBodSchema = z.infer<typeof commentOnAnswerBodSchema>;

@Controller('/answer/:answerId/comments')
export class CommentOnAnswerController {
  constructor(private answerComment: CommentOnAnswerUseCase) {}

  @Post()
  @HttpCode(201)
  async handle(
    @Body(bodyValidationPipe) body: CommentOnAnswerBodSchema,
    @UserDecorator() user: payloadSchema,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub;
    const { content } = body;

    const result = await this.answerComment.execute({
      answerId,
      authorId: userId,
      content,
    });

    if (result.isLeft()) {
      throw new BadRequestException();
    }
  }
}
