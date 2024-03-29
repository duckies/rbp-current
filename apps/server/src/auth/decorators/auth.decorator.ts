import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { isArray } from '@rbp/shared';
import { Actions, Subjects } from '../../permission/permission.entity';
import { Abilities } from '../ability-factory.service';
import { AUTH_ABILITY_KEY } from '../auth.constants';
import { JWTGuard } from '../guards';
import { PermissionGuard } from '../guards/permission.guard';

export function Auth(): MethodDecorator;
export function Auth(action: Actions, subject: Subjects): MethodDecorator;
export function Auth(abilities: Abilities[]): MethodDecorator;
export function Auth(
  actionOrAbilities?: Actions | Abilities[],
  subject?: Subjects,
): MethodDecorator {
  if (
    !actionOrAbilities
    || (isArray(actionOrAbilities) && actionOrAbilities.length === 0)
  ) {
    return UseGuards(JWTGuard);
  }

  const abilities: Abilities[] = Array.isArray(actionOrAbilities)
    ? actionOrAbilities
    : [[actionOrAbilities, subject!]];

  return applyDecorators(
    UseGuards(JWTGuard),
    SetMetadata(AUTH_ABILITY_KEY, abilities),
    UseGuards(PermissionGuard),
  );
}
