import {
  APIApplicationCommandSubcommandGroupOption,
  ApplicationCommandOptionType,
} from 'discord.js'
import { DUPLICATE_OPTION } from '../bot.messages'
import { CommandMetadata, SubCommandGroupMetadata } from '../decorators'
import { CommandOption } from './command-option.class'
import { SubCommand } from './sub-command.interaction'

export class SubCommandGroup extends CommandOption {
  public readonly type = ApplicationCommandOptionType.SubcommandGroup
  public readonly name: string
  public readonly description: string
  public readonly options = new Map<string, SubCommand>()

  constructor({ name, description }: SubCommandGroupMetadata) {
    super()
    this.name = name
    this.description = description
  }

  setOption<T extends SubCommand>(name: string, option: T): T {
    if (this.options.has(name)) {
      throw new Error(DUPLICATE_OPTION(this.name, name))
    }

    this.options.set(name, option)

    return option
  }

  addSubCommand(commandMetadata: CommandMetadata, method: Function) {
    return this.setOption(commandMetadata.name, new SubCommand(commandMetadata, method))
  }

  toJSON(): APIApplicationCommandSubcommandGroupOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      options: [...this.options.values()].map((o) => o.toJSON()),
    }
  }
}
