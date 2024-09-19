import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/auth/authenticate.controller';
import { CreateAccountController } from './controllers/account/create-account.controller';
import { EditQuestionController } from './controllers/questions/edit-question.controller';
import { DeleteQuestionController } from './controllers/questions/delete-question.controller';
import { CreateQuestionController } from './controllers/questions/create-questions.controller';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/question/edit-question';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question';
import { DeleteQuestionUseCase } from '@/domain/forum/application/use-cases/question/delete-question';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student';
import { FetchQuestionBySlugController } from './controllers/questions/fetch-question-by-slug.controller';
import { FetchRecentQuestionsController } from './controllers/questions/fetch-recente-question.controller';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/student/authenticate-student';
import { FetchQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/question/fetch-question-by-slug';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/fetch-recent-questions';
import { AnswerQuestionUseCase } from '@/domain/forum/application/use-cases/answer-question/answer-question';
import { AnswerQuestionController } from './controllers/answers/answer-question.controller';
import { EditAnswerController } from './controllers/answers/edit-answer.controller';
import { EditAnswerUseCase } from '@/domain/forum/application/use-cases/answer/edit-answer';
import { DeleteAnswerController } from './controllers/answers/delete-answer.controller';
import { DeleteAnswerUseCase } from '@/domain/forum/application/use-cases/answer/delete-answer';
import { FetchQuestionAnswersUseCase } from '@/domain/forum/application/use-cases/answer-question/fetch-question-answers';
import { FetchQuestionAnswerController } from './controllers/answers/fetch-answers-question.controller';
import { ChooseBestAnswerQuestionController } from './controllers/answers/choose-best-answers-question.controller';
import { ChooseQuestionBestAnswerUseCase } from '@/domain/forum/application/use-cases/question/choose-question-best-answer';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
    EditQuestionController,
    FetchRecentQuestionsController,
    FetchQuestionBySlugController,
    DeleteQuestionController,
    AnswerQuestionController,
    EditAnswerController,
    DeleteAnswerController,
    FetchQuestionAnswerController,
    ChooseBestAnswerQuestionController
  ],
  providers: [
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    CreateQuestionUseCase,
    EditQuestionUseCase,
    FetchRecentQuestionsUseCase,
    FetchQuestionBySlugUseCase,
    DeleteQuestionUseCase,
    AnswerQuestionUseCase,
    EditAnswerUseCase,
    DeleteAnswerUseCase,
    FetchQuestionAnswersUseCase,
    ChooseQuestionBestAnswerUseCase
  ],
})
export class HttpModule {}
