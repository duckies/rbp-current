import { Injectable, Logger } from '@nestjs/common'
import { DiscoveryService, MetadataScanner } from '@nestjs/core'
import { Constructor } from '../common/interfaces'
import { BotMetadataAccessor } from './bot.accessor'
import { MISSING_COMMAND, OPTION_MISSING_COMMAND } from './bot.messages'
import { BotRegistry } from './bot.registry'
import { Command, SubCommand } from './commands'
import { ChannelOption } from './commands/options/channel.option'
import { NumberOption } from './commands/options/number.option'
import { StringOption } from './commands/options/string.option'

@Injectable()
export class BotExplorer {
  private readonly logger = new Logger(BotExplorer.name)

  constructor(
    private readonly metadataScanner: MetadataScanner,
    private readonly discoveryService: DiscoveryService,
    private readonly accessor: BotMetadataAccessor,
    private readonly registery: BotRegistry
  ) {}

  private exploreClassPrototype(target: Constructor | Function) {
    const groupMetadata = this.accessor.getGroupMetadata(target)
    const subGroupMetadatas = this.accessor.getSubGroupMetadata(target)

    if (!groupMetadata) {
      // SubGroups were declared without a group.
      if (subGroupMetadatas.length > 0) {
        throw new Error(`SubGroup "${target.name}" declared without declaring a group.`)
      }

      return
    }

    const command = new Command(groupMetadata)

    for (const subGroupMetadata of subGroupMetadatas) {
      command.addSubCommandGroup(subGroupMetadata)
    }

    this.registery.addCommand(command)

    return command
  }

  private exploreMethodPrototype(instance: any, key: string) {
    const target = instance[key] as Function
    const commandMetadata = this.accessor.getCommandMetadata(target)
    const useGroupsMetadata = this.accessor.getUseGroupsMetadata(target)
    const event = this.accessor.getEventMetadata(target)

    if (event) {
      this.registery.addEvent(event, instance, target.bind(instance))
    }

    // Any decorator beyond this point must also be accompanied by a Command.
    if (!commandMetadata) {
      if (useGroupsMetadata) {
        throw new Error(MISSING_COMMAND(target.name))
      }

      return
    }

    if (useGroupsMetadata) {
      const { groupName, subGroupName } = useGroupsMetadata
      const path = [groupName, subGroupName].filter((x) => !!x) as string[]
      const commandOrGroup = this.registery.getCommand(path, ['Command', 'SubCommandGroup'])

      return commandOrGroup.addSubCommand(commandMetadata, target.bind(instance))
    } else {
      const command = new Command(commandMetadata, target.bind(instance))

      return this.registery.addCommand(command)
    }
  }

  private explorePropertyMetadata(
    target: Constructor & Record<string, any>,
    key: string,
    command: Command | SubCommand | void
  ) {
    const metadata = this.accessor.getOptionsMetadata(target, key)

    if (!metadata) {
      return
    } else if (!command) {
      throw new Error(OPTION_MISSING_COMMAND(target[key].name))
    }

    for (const option of metadata) {
      switch (option.type) {
        case 'String':
          command.addOption(new StringOption(option))
          break
        case 'Channel':
          command.addOption(new ChannelOption(option))
          break
        case 'Number':
          command.addOption(new NumberOption(option))
          break
        case 'Integer':
          command.addOption(new NumberOption(option))
          break
        default:
          throw new Error(`Unimplemented param option type: ${option.type}`)
      }
    }
  }

  public explore() {
    const instanceWrappers = this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.isDependencyTreeStatic())

    for (const wrapper of instanceWrappers) {
      const { instance, metatype } = wrapper

      if (!instance) {
        continue
      }

      this.exploreClassPrototype(metatype || instance.constructor)

      this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (key) => {
        const commandOrSubCommand = this.exploreMethodPrototype(instance, key)

        this.explorePropertyMetadata(instance, key, commandOrSubCommand)
      })
    }
  }
}
