import { RedocModule } from '@brakebein/nestjs-redoc';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: errors => {
        const formattedErrors = errors.map(error => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));

        return new BadRequestException({ message: 'Validation failed', errors: formattedErrors });
      },
    }),
  );

  app.enableCors();
  app.use(cookieParser());

  const configService = app.get<ConfigService>(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Docktoo')
    .setDescription('API specification for an application providing online healthcare services')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  RedocModule.setup('/', app, document, {});

  await app.listen(configService.get('BACKEND_PORT'));
}

bootstrap();
