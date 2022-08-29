import { IncomingHttpHeaders } from 'http'
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common'
import type { Request } from 'express'
import type { User } from '@prisma/client'
import { AuthService } from '../auth.service'
import { UserService } from '../../user/user.service'

export type RequestWithAuth = Request & { user: User }

@Injectable()
export class JWTGuard implements CanActivate {
  private readonly logger = new Logger('JWTGuard')

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  getBearerTokenFromHeader(headers: IncomingHttpHeaders) {
    return headers.authorization?.split(' ')[1]
  }

  async canActivate(ctx: ExecutionContext) {
    this.logger.log('Auth Guard')

    const request = ctx.switchToHttp().getRequest<RequestWithAuth>()
    const token = this.getBearerTokenFromHeader(request.headers)

    if (typeof token === 'string') {
      const { id }: { id: number } = this.authService.verifyJWT(token)

      const user = await this.userService.find({ where: { id } })

      if (user) {
        request.user = user
        return true
      }
    }

    return false
  }
}
