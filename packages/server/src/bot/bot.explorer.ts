import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { DiscoveryService, MetadataScanner } from '@nestjs/core'
import { Constructor } from '../common/interfaces'
import { BotMetadataAccessor } from './bot.accessor'
import { MISSING_COMMAND } from './bot.messages'
import { BotRegistry } from './bot.registry'
import { Command, SubCommand, SubCommandGroup } from './classes'

@Injectable()
export class BotExplorer implements OnModuleInit {
  private readonly logger = new Logger(BotExplorer.name)

  constructor(
    private readonly metadataScanner: MetadataScanner,
    private readonly discoveryService: DiscoveryService,
    private readonly accessor: BotMetadataAccessor,
    private readonly registery: BotRegistry
  ) {}

  onModuleInit() {
    this.explore()
  }

  exploreClass(target: Constructor | Function) {
    const groupMetadata = this.accessor.getGroupMetadata(target)
    const subGroupMetadatas = this.accessor.getSubGroupMetadata(target)

    if (!groupMetadata) {
      // SubGroups were declared without a group.
      if (subGroupMetadatas.length > 0) {
        throw new Error(
          `SubGroup "${target.name}" declared without declaring a group.`
        )
      }

      return
    }

    const command = Command.fromGroupMetadata(groupMetadata)

    for (const subGroupMetadata of subGroupMetadatas) {
      command.addSubCommandGroup(subGroupMetadata)
    }

    this.registery.add(command)

    return command
  }

  exploreMethod(target: Function) {
    const commandMetadata = this.accessor.getCommandMetadata(target)
    const useGroupsMetadata = this.accessor.getUseGroupsMetadata(target)

    if (!commandMetadata) {
      // UseGroups were declared without a command.
      if (useGroupsMetadata) {
        throw new Error(MISSING_COMMAND(target.name))
      }

      return
    }

    if (useGroupsMetadata) {
      const { groupName, subGroupName } = useGroupsMetadata
      const path = [groupName, subGroupName].filter((x) => !!x) as string[]

      const commandOrGroup = this.registery.get(path)

      if (
        !commandOrGroup ||
        !(
          commandOrGroup instanceof Command ||
          commandOrGroup instanceof SubCommandGroup
        )
      ) {
        throw new Error('Missing group or sub-group.')
      }

      const subCommand = SubCommand.fromCommandMetadata(commandMetadata, target)
      commandOrGroup.addSubCommand(subCommand, target)
    } else {
      const command = Command.fromCommandMetadata(commandMetadata, target)

      this.registery.add(command)
    }
  }

  explore() {
    const instanceWrappers = this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())

    for (const wrapper of instanceWrappers) {
      const { instance, metatype } = wrapper

      if (!instance) {
        continue
      }

      this.exploreClass(metatype || instance.constructor)

      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (key) => this.exploreMethod(instance[key])
      )
    }
  }
}
