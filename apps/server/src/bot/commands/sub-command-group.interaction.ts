import {
  APIApplicationCommandSubcommandGroupOption,
  ApplicationCommandOptionType,
} from 'discord.js'
import { SubCommandGroupMetadata } from '../decorators'
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

  addSubCommand(subCommand: SubCommand) {
    if (this.options.has(subCommand.name)) {
      throw new Error(`Duplicate subcommand ${subCommand.name} for subcommand group ${this.name}`)
    }

    this.options.set(subCommand.name, subCommand)
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
