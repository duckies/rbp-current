import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import type { Request } from 'express'
import { IncomingHttpHeaders } from 'http'
import { User } from '../../user/user.entity'
import { UserService } from '../../user/user.service'
import { AuthService } from '../auth.service'

export type RequestWithAuth = Request & { user: User }

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  getBearerTokenFromHeader(headers: IncomingHttpHeaders) {
    return headers.authorization?.split(' ')[1]
  }

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<RequestWithAuth>()
    const token = this.getBearerTokenFromHeader(request.headers)

    if (typeof token === 'string') {
      const { id }: { id: number } = this.authService.verifyJWT(token)

      const user = await this.userService.repository.findOne(
        { id },
        {
          populate: ['identities'],
        }
      )

      if (user) {
        request.user = user

        return true
      }
    }

    return false
  }
}
