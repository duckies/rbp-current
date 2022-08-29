import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common'
import { Abilities, Action, Subject } from '../ability-factory.service'
import { AUTH_ABILITY_KEY } from '../auth.constants'
import { JWTGuard } from '../guards'
import { PermissionGuard } from '../guards/permission.guard'

export function Auth(): MethodDecorator
export function Auth(action: Action, subject: Subject): MethodDecorator
export function Auth(abilities: Abilities[]): MethodDecorator
export function Auth(
  actionOrAbilities?: Action | Abilities[],
  subject?: Subject
): MethodDecorator {
  if (
    !actionOrAbilities ||
    (Array.isArray(actionOrAbilities) && actionOrAbilities.length === 0)
  ) {
    return UseGuards(JWTGuard)
  }

  const abilities: Abilities[] = Array.isArray(actionOrAbilities)
    ? actionOrAbilities
    : [[actionOrAbilities, subject!]]

  return applyDecorators(
    UseGuards(JWTGuard),
    SetMetadata(AUTH_ABILITY_KEY, abilities),
    UseGuards(PermissionGuard)
  )
}
