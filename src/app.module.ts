import { envSchema } from './env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { CreateAccountController } from './controllers/create-account.controller';
import { AuthenticateController } from './controllers/authenticate.controller';
import { DeleteUsersController } from './controllers/delete.controller';

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
    DeleteUsersController
  ],
  providers: [PrismaService],
})

export class AppModule {}
