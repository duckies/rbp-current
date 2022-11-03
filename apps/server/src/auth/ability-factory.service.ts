import { Ability } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Actions, Subjects, User } from '../entities';
import { UserService } from '../user/user.service';

export type Abilities = [Actions, Subjects];
export type AppAbility = Ability<Abilities>;

@Injectable()
export class AbilityFactory {
  constructor(private readonly userService: UserService) { }

  async forUser(user: User): Promise<AppAbility> {
    const permissions = await this.userService.getPermissions(user.id);

    return new Ability<Abilities>(
      permissions.map(p => ({
        action: p.action,
        subject: p.subject,
        inverted: p.inverted,
        reason: p.reason || undefined,
        conditions: (p.conditions as any) || undefined,
      })),
    );
  }
}
