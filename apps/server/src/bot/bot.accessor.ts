import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Constructor } from '../common/interfaces';
import {
  BOT_COMMAND,
  BOT_GROUP,
  BOT_SUBGROUP,
  BOT_USE_GROUPS,
} from './bot.constants';
import { CommandMetadata } from './decorators/command.decorator';
import { GroupMetadata } from './decorators/group.decorator';
import { SubGroupMetadata } from './decorators/sub-group.decorator';
import { UseGroupsMetadata } from './decorators/use-groups.decorator';

@Injectable()
export class BotMetadataAccessor {
  constructor(private readonly reflector: Reflector) {}

  getGroupMetadata(target: Constructor | Function): GroupMetadata | undefined {
    return this.reflector.get(BOT_GROUP, target);
  }

  getSubGroupMetadata(target: Constructor | Function): SubGroupMetadata[] {
    return this.reflector.get(BOT_SUBGROUP, target) || [];
  }

  getCommandMetadata(target: Function): CommandMetadata | undefined {
    return this.reflector.get(BOT_COMMAND, target);
  }

  getUseGroupsMetadata(target: Function): UseGroupsMetadata | undefined {
    return this.reflector.get(BOT_USE_GROUPS, target);
  }
}
