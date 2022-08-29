import { Injectable } from '@nestjs/common'
import type { Subjects as CASLSubjects } from '@casl/prisma'
import { PrismaAbility } from '@casl/prisma'
import type {
  Action as CASLAction,
  Identity,
  Permission,
  Role,
  Slide,
  User,
} from '@prisma/client'
import { UserService } from '../user/user.service'

export type Action = CASLAction
export type Subject = CASLSubjects<{
  User: User
  Identity: Identity
  Role: Role
  Permission: Permission
  Slide: Slide
}>

export type Abilities = [Action, Subject]
export type AppAbility = PrismaAbility<Abilities>

@Injectable()
export class AbilityFactory {
  constructor(private readonly userService: UserService) {}

  async forUser(user: User) {
    const permissions = await this.userService.getPermissions(user.id)

    return new PrismaAbility<Abilities>(
      permissions.map((p) => ({
        action: p.action,
        subject: p.subject,
        inverted: p.inverted,
        reason: p.reason || undefined,
        conditions: p.conditions as any,
      }))
    )
  }
}
