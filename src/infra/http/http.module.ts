import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateController } from './controllers/auth/authenticate.controller';
import { CreateAccountController } from './controllers/account/create-account.controller';
import { CreateQuestionController } from './controllers/question/create-questions.controller';
import { FetchRecentQuestionsController } from './controllers/question/fetch-recente-question.controller';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/fetch-recent-questions';
import { AuthenticateStudentUseCase } from '@/domain/forum/application/use-cases/student/authenticate-student';
import { RegisterStudentUseCase } from '@/domain/forum/application/use-cases/student/register-student';

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase,
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
  ],
})
export class HttpModule {}
