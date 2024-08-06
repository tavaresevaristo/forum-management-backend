import {
  createQuestionsBodySchema,
  CreateQuestionsBodySchema,
} from '../interface/rest/question.dto';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question';

const bodyValidationPipe = new ZodValidationPipe(CreateQuestionsBodySchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: createQuestionsBodySchema,
    @UserDecorator() user: payloadSchema,
  ) {
    
    const userId = user.sub;
    const { title, content } = body;

    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: [],
    });
  }
}
