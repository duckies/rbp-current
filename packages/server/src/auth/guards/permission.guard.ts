import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Abilities, AbilityFactory } from '../ability-factory.service'
import { AUTH_ABILITY_KEY } from '../auth.constants'
import { RequestWithAuth } from './jwt.guard'

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly abilityFactory: AbilityFactory,
    private readonly reflector: Reflector
  ) {}

  getAbilities(ctx: ExecutionContext) {
    return this.reflector.get<Abilities[]>(AUTH_ABILITY_KEY, ctx.getHandler())
  }

  getRequestUser(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest<RequestWithAuth>()
    return request.user
  }

  async canActivate(ctx: ExecutionContext) {
    const abilities = this.getAbilities(ctx)
    const user = this.getRequestUser(ctx)

    const ability = await this.abilityFactory.forUser(user)

    return abilities.every(([action, subject]) => ability.can(action, subject))
  }
}
