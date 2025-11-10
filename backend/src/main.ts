import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger } from '@nestjs/common';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe.js';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 4000;
  const origin = config.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000';

  app.setGlobalPrefix('api/v1');
  app.enableCors({
    origin,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  });

  app.useGlobalPipes(new ZodValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Crow API')
    .setDescription('Documentación de la API de Crow Repuestos')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, doc);

  await app.listen(port);
  Logger.log(`Crow API listening on http://localhost:${port}/api/v1`);
  Logger.log(`Swagger UI available at http://localhost:${port}/api/docs`);
}

bootstrap();
