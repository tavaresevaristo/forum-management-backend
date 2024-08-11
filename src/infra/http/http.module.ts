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
  ],
  providers: [
    AuthenticateStudentUseCase,
    RegisterStudentUseCase,
    CreateQuestionUseCase,
    EditQuestionUseCase,
    FetchRecentQuestionsUseCase,
    FetchQuestionBySlugUseCase,
    DeleteQuestionUseCase,
  ],
})
export class HttpModule {}
