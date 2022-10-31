import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { TokenExpiredError } from 'jsonwebtoken'

@Catch(TokenExpiredError)
export class TokenExpiredExceptionFilter implements ExceptionFilter {
  catch(_exception: TokenExpiredError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = HttpStatus.UNAUTHORIZED

    response
      .status(status)
      .json({
        statusCode: status,
        message: 'JWT is expired',
      })
  }
}
