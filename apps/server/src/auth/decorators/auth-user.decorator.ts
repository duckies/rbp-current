import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

/**
 * Parameter decorator for retrieving the currently
 * authenticated user. This requires the `AuthGuard`
 * to have been ran prior.
 */
export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>()
    return (request as Request & { user: User }).user
  },
)
