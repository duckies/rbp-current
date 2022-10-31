import { IncomingHttpHeaders } from 'http';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { UserDTO } from '../../app.exports';

export type RequestWithAuth = Request & { user: UserDTO };

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  getBearerTokenFromHeader(headers: IncomingHttpHeaders) {
    return headers.authorization?.split(' ')[1];
  }

  async canActivate(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<RequestWithAuth>();
    const token = this.getBearerTokenFromHeader(request.headers);

    if (typeof token === 'string') {
      const { id }: { id: number } = this.authService.verifyJWT(token);

      const user = await this.userService.repository.findUnique({
        where: { id },
        include: { identities: true },
      });

      if (user) {
        const { identities, ...meta } = user;

        request.user = {
          ...meta,
          ...identities.reduce(
            (obj, identity) => ({
              ...obj,
              [identity.provider.toLowerCase()]: identity,
            }),
            {},
          ),
        } as UserDTO;

        return true;
      }
    }

    return false;
  }
}
