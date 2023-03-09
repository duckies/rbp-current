import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino'
import { EnvironmentVariables } from './app.config'
import { AppModule } from './app.module'
import {
  JsonWebTokenExceptionFilter,
  NotBeforeExceptionFilter,
  TokenExpiredExceptionFilter,
} from './auth/exception-filters'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  const config = app.get(EnvironmentVariables)

  // Use pino logger
  app.useLogger(app.get(Logger))

  // Ensures database connections are closed on shutdown.
  app.enableShutdownHooks()

  app.useGlobalFilters(
    new NotBeforeExceptionFilter(),
    new JsonWebTokenExceptionFilter(),
    new TokenExpiredExceptionFilter()
  )

  app.useGlobalInterceptors(new LoggerErrorInterceptor())

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    })
  )

  app.enableCors()

  await app.listen(config.PORT)
}
bootstrap()
