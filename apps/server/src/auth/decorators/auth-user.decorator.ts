import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { RequestWithAuth } from '../guards';

/**
 * Parameter decorator for retrieving the currently
 * authenticated user. This requires the `AuthGuard`
 * to have been ran prior.
 */
export const AuthUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithAuth>();
    return request.user;
  },
);
