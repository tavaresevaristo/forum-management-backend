import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/auth/authenticate.controller';
import { CreateAccountController } from './controllers/account/create-account.controller';
import { CreateQuestionController } from './controllers/questions/create-questions.controller';
import { FetchRecentQuestionsController } from './controllers/questions/fetch-recente-question.controller';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/fetch-recent-questions';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/student/authenticate-student';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student';
import { FetchQuestionBySlugUseCase } from '@/domain/forum/application/use-cases/question/fetch-question-by-slug';
import { FetchQuestionBySlugController } from './controllers/questions/fetch-question-by-slug.controller';
import { EditQuestionUseCase } from '@/domain/forum/application/use-cases/question/edit-question';
import { EditQuestionController } from './controllers/questions/edit-question.controller';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
    EditQuestionController,
    FetchRecentQuestionsController,
    FetchQuestionBySlugController,
  ],
  providers: [
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    CreateQuestionUseCase,
    EditQuestionUseCase,
    FetchRecentQuestionsUseCase,
    FetchQuestionBySlugUseCase,
  ],
})
export class HttpModule {}
