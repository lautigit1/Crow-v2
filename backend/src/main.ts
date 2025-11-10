import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { Logger } from '@nestjs/common';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe.js';
import helmet from 'helmet';
import { SanitizePipe } from './common/pipes/sanitize.pipe.js';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

  const config = app.get(ConfigService);
  const port = config.get<number>('PORT') ?? 4000;
  const origin = config.get<string>('CORS_ORIGIN') ?? 'http://localhost:3000';

  app.setGlobalPrefix('api/v1');
  // Support multiple origins via CORS_ORIGINS (comma separated) or fallback single origin
  const originsRaw = config.get<string>('CORS_ORIGINS');
  const originList = originsRaw ? originsRaw.split(',').map(o => o.trim()).filter(Boolean) : [origin];
  app.enableCors({
    origin: (reqOrigin, cb) => {
      if (!reqOrigin || originList.includes(reqOrigin)) return cb(null, reqOrigin || originList[0]);
      return cb(new Error('CORS blocked'), false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 600,
  });

  // Security headers
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false, // Optionally define CSP later
  }));

  app.useGlobalPipes(new SanitizePipe(), new ZodValidationPipe());
  // Use DI to resolve filter (it now expects ErrorTrackingService injected)
  const exceptionFilter = app.get(HttpExceptionFilter);
  app.useGlobalFilters(exceptionFilter);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Crow API')
    .setDescription('Documentación de la API de Crow Repuestos')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const doc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, doc);

  // Global logging
  app.useGlobalInterceptors(app.get(LoggingInterceptor));

  await app.listen(port);
  Logger.log(`Crow API listening on http://localhost:${port}/api/v1`);
  Logger.log(`Swagger UI available at http://localhost:${port}/api/docs`);
}

bootstrap();
