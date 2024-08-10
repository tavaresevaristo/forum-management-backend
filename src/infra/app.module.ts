import { envSchema } from './env/env';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';
import { EnvModule } from './env/env.module';

@Module({
  imports: [
    EnvModule,
    AuthModule,
    HttpModule,
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
