import { QuestionPresenter } from '../../presenters/question-presenter';
import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { FetchQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/question/fetch-question-by-slug';

@Controller('/questions/:slug')
export class FetchQuestionBySlugController {
  constructor(private fetchQuestion: FetchQuestionBySlugUseCase) {}

  @Get()
  async handle(@Param('slug') slug: string) {
    const result = await this.fetchQuestion.execute({ slug });

    if (result.isLeft()) {
      throw new BadRequestException();
    }

    return { question: QuestionPresenter.toHTTP(result.value.question) };
  }
}
