import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  // TODO: Use setGlobalPrefix.
  app.enableCors();
  app.use(cookieParser());

  const configService = app.get<ConfigService>(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Docktoo')
    .setDescription('API specification for an application providing online healthcare services')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('BACKEND_PORT'));
}

bootstrap();
