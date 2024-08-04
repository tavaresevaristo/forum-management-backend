import { envSchema } from './env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { DeleteUsersController } from './http/controllers/delete.controller';
import { AuthenticateController } from './http/controllers/authenticate.controller';
import { CreateAccountController } from './http/controllers/create-account.controller';
import { CreateQuestionController } from './http/controllers/create-questions.controller';
import { FetchRecentQuestionsController } from './http/controllers/fetch-recente-question.controller';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],

  controllers: [
    CreateAccountController,
    AuthenticateController,
    DeleteUsersController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
