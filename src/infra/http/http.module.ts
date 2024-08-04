import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DeleteUsersController } from './controllers/delete.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { CreateAccountController } from './controllers/create-account.controller';
import { CreateQuestionController } from './controllers/create-questions.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recente-question.controller';

@Module({
  controllers: [
    DeleteUsersController,
    AuthenticateController,
    CreateAccountController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
