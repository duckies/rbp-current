import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Response } from 'express'
import { JsonWebTokenError } from 'jsonwebtoken'

@Catch(JsonWebTokenError)
export class JsonWebTokenExceptionFilter implements ExceptionFilter {
  catch(_exception: JsonWebTokenError, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = HttpStatus.UNAUTHORIZED

    response
      .status(status)
      .json({
        statusCode: status,
        message: 'JWT could not be validated',
      })
  }
}
