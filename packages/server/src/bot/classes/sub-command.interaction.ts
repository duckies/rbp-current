import {
  APIApplicationCommandSubcommandOption,
  ApplicationCommandOptionType,
} from 'discord.js'
import { CommandMetadata } from '../decorators/command.decorator'
import { CommandOption } from '../interfaces'

export class SubCommand implements CommandOption {
  public readonly type = ApplicationCommandOptionType.Subcommand
  public readonly name: string
  public readonly description: string
  public readonly methodRef: Function
  public readonly options = new Map<string, CommandOption>()

  constructor(name: string, description: string, method: Function) {
    this.name = name
    this.description = description
    this.methodRef = method
  }

  /**
   * Creates a new sub-command from command metadata.
   *
   * This sub-command can be the child of a root command or sub-command-group.
   */
  static fromCommandMetadata(metadata: CommandMetadata, method: Function) {
    return new SubCommand(metadata.name, metadata.description, method)
  }

  toJSON(): APIApplicationCommandSubcommandOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
    }
  }
}
