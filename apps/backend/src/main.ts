import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // TODO: Use setGlobalPrefix.
  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  await app.listen(configService.get('BACKEND_PORT'));
}

bootstrap();
