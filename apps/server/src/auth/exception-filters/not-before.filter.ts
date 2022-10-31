import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { NotBeforeError } from 'jsonwebtoken'

@Catch(NotBeforeError)
export class NotBeforeExceptionFilter implements ExceptionFilter {
  catch(exception: NotBeforeError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = HttpStatus.UNAUTHORIZED

    response
      .status(status)
      .json({
        statusCode: status,
        message: 'JWT is not yet active',
        date: exception?.date,
      })
  }
}
