import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { DeleteUsersController } from './controllers/delete.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-questions.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recente-question.controller';
import { CreateQuestionUseCase } from '@/domain/forum/application/use-cases/question/create-question';
import { FetchRecentQuestionsUseCase } from '@/domain/forum/application/use-cases/question/fetch-recent-questions';

@Module({
  imports: [DatabaseModule],
  controllers: [
    DeleteUsersController,
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [
    CreateQuestionUseCase,
    FetchRecentQuestionsUseCase
  ]
})
export class HttpModule {}
