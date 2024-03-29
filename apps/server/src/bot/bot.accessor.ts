import { Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { ClientEvents } from 'discord.js'
import { Constructor } from '../common/interfaces'
import {
  BOT_COMMAND,
  BOT_EVENT,
  BOT_GROUP,
  BOT_OPTIONS,
  BOT_SUBGROUP,
  BOT_USE_GROUPS,
} from './bot.constants'
import { CommandMetadata } from './decorators/command.decorator'
import { GroupMetadata } from './decorators/group.decorator'
import { OptionMetadata } from './decorators/option.decorator'
import { SubCommandGroupMetadata } from './decorators/sub-group.decorator'
import { UseGroupsMetadata } from './decorators/use-groups.decorator'

@Injectable()
export class BotMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getGroupMetadata(target: Constructor | Function): GroupMetadata | undefined {
    return this.reflector.get(BOT_GROUP, target)
  }

  getSubGroupMetadata(target: Constructor | Function): SubCommandGroupMetadata[] {
    return this.reflector.get(BOT_SUBGROUP, target) || []
  }

  getCommandMetadata(target: Function): CommandMetadata | undefined {
    return this.reflector.get(BOT_COMMAND, target)
  }

  getUseGroupsMetadata(target: Function): UseGroupsMetadata | undefined {
    return this.reflector.get(BOT_USE_GROUPS, target)
  }

  getEventMetadata(target: Function): keyof ClientEvents | undefined {
    return this.reflector.get(BOT_EVENT, target)
  }

  getOptionsMetadata(target: Constructor, methodName: string): OptionMetadata[] | undefined {
    return Reflect.getMetadata(BOT_OPTIONS, target, methodName) || undefined
  }
}
