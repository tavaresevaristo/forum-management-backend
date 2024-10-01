import {
  createQuestionsBodySchema,
  CreateQuestionsBodySchema,
} from '../../interface/rest/question.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question';

const bodyValidationPipe = new ZodValidationPipe(CreateQuestionsBodySchema);

@Controller('/question')
export class CreateQuestionController {
  constructor(private createQuestion: CreateQuestionUseCase) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: createQuestionsBodySchema,
    @UserDecorator() user: payloadSchema,
  ) {
    const userId = user.sub;
    const { title, content, attachments } = body;
    
    await this.createQuestion.execute({
      title,
      content,
      authorId: userId,
      attachmentsIds: attachments,
    });
  }
}