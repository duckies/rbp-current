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
        throw new Error(`SubGroup "${target.name}" declared without declaring a group.`)
      }

      return
    }

    const command = Command.fromGroupMetadata(groupMetadata)

    for (const subGroupMetadata of subGroupMetadatas) {
      command.addSubCommandGroup(subGroupMetadata)
    }

    this.registery.addCommand(command)

    return command
  }

  exploreMethod(instance: any, key: string) {
    const target = instance[key] as Function
    const commandMetadata = this.accessor.getCommandMetadata(target)
    const useGroupsMetadata = this.accessor.getUseGroupsMetadata(target)
    const event = this.accessor.getEventMetadata(target)

    if (event) {
      this.logger.verbose(`Added event listener: ${event}`)
      this.registery.addEvent(event, instance, target)
    }

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

      const commandOrGroup = this.registery.getCommand(path)

      if (
        !commandOrGroup ||
        !(commandOrGroup instanceof Command || commandOrGroup instanceof SubCommandGroup)
      ) {
        throw new Error('Missing group or sub-group.')
      }

      const subCommand = SubCommand.fromCommandMetadata(commandMetadata, target)
      return commandOrGroup.addSubCommand(subCommand, target)
    } else {
      const command = Command.fromCommandMetadata(commandMetadata, target)

      return this.registery.addCommand(command)
    }
  }

  // Not yet implemented.
  // private explorePropertyMetadata(
  //   target: Constructor & Record<string, any>,
  //   key: string,
  //   command?: Command | SubCommand
  // ) {
  //   const metadata = this.accessor.getOptionsMetadata(target, key)

  //   if (!metadata) {
  //     return
  //   } else if (!command) {
  //     throw new Error(OPTION_MISSING_COMMAND(target[key].name))
  //   }

  //   for (const option of metadata) {
  //     command.addOption(option)
  //   }
  // }

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

      this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (key) => {
        this.exploreMethod(instance, key)

        // this.explorePropertyMetadata(instance, key, command)
      })
    }
  }
}
