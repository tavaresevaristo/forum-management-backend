import { ENV } from './env';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService<ENV, true>>(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);
}
bootstrap();
