import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { EnvironmentVariables } from './app.config';
import { AppModule } from './app.module';
import {
  JsonWebTokenExceptionFilter,
  NotBeforeExceptionFilter,
  TokenExpiredExceptionFilter,
} from './auth/exception-filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(EnvironmentVariables);

  // Ensures database connections are closed on shutdown.
  app.enableShutdownHooks();

  app.useGlobalFilters(
    new NotBeforeExceptionFilter(),
    new JsonWebTokenExceptionFilter(),
    new TokenExpiredExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );

  app.enableCors();

  await app.listen(config.PORT);
}
bootstrap();
