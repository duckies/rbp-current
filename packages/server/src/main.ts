import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import {
  JsonWebTokenExceptionFilter,
  NotBeforeExceptionFilter,
  TokenExpiredExceptionFilter,
} from './auth/exception-filters'
import { PrismaService } from './common/database/prisma.service'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Ensures nest shuts down when prisma receives a shutdown signal.
  const prisma = app.get(PrismaService)
  await prisma.enableShutdownHooks(app)

  app.useGlobalFilters(
    new NotBeforeExceptionFilter(),
    new JsonWebTokenExceptionFilter(),
    new TokenExpiredExceptionFilter()
  )

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    })
  )

  await app.listen(3000)
}
bootstrap()
