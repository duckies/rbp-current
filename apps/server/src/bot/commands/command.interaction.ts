import { ApplicationCommandType, RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js'
import { DUPLICATE_OPTION } from '../bot.messages'
import { CommandMetadata } from '../decorators/command.decorator'
import { SubCommandGroupMetadata } from '../decorators/sub-group.decorator'
import { BasicCommandOption } from './command-option.class'
import { SubCommandGroup } from './sub-command-group.interaction'
import { SubCommand } from './sub-command.interaction'

export class Command {
  public readonly type = ApplicationCommandType.ChatInput
  public readonly name: string
  public readonly description: string
  public readonly methodRef?: Function
  public readonly options = new Map<string, SubCommand | SubCommandGroup | BasicCommandOption>()

  constructor({ name, description }: CommandMetadata, method?: Function) {
    this.name = name
    this.description = description
    this.methodRef = method
  }

  setOption<T extends SubCommand | SubCommandGroup | BasicCommandOption>(
    name: string,
    option: T
  ): T {
    if (this.options.has(name)) {
      throw new Error(DUPLICATE_OPTION(this.name, name))
    }

    this.options.set(name, option)

    return option
  }

  addSubCommandGroup(metadata: SubCommandGroupMetadata) {
    return this.setOption(metadata.name, new SubCommandGroup(metadata))
  }

  addSubCommand(metadata: CommandMetadata, methodRef: Function) {
    return this.setOption(metadata.name, new SubCommand(metadata, methodRef))
  }

  addOption(option: BasicCommandOption) {
    return this.setOption(option.name, option)
  }

  toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      options: [...this.options.values()].map((o) => o.toJSON()),
    }
  }
}
