import { payloadSchema } from '@/infra/auth/jwt.strategy';
import { UserDecorator } from '@/infra/auth/user.decorator';
import {
  BadRequestException,
  Controller,
  HttpCode,
  Param,
  Patch,
} from '@nestjs/common';
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/question/choose-question-best-answer';

@Controller('answer/:answerId/choose-as-best')
export class ChooseBestAnswerQuestionController {
  constructor(
    private chooseBestAnswerQuestion: ChooseQuestionBestAnswerUseCase,
  ) {}

  @Patch()
  @HttpCode(204)
  async handle(
    @UserDecorator() user: payloadSchema,
    @Param('answerId') answerId: string,
  ) {
    const userId = user.sub;
    const result = await this.chooseBestAnswerQuestion.execute({
      authorId: userId,
      answerId,
    });

    if (result.isLeft()) {
      console.error('Error choosing best answer:', result.value);
      throw new BadRequestException();
    }
  }
}
