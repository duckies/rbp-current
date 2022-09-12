import {
  APIApplicationCommandSubcommandGroupOption,
  ApplicationCommandOptionType,
} from 'discord.js'
import { SubGroupMetadata } from '../decorators/sub-group.decorator'
import { ApplicationCommandOption } from '../interfaces'
import { SubCommand } from './sub-command.interaction'

export class SubCommandGroup implements ApplicationCommandOption {
  public readonly type = ApplicationCommandOptionType.SubcommandGroup
  public readonly name: string
  public readonly description: string
  public readonly options = new Map<string, ApplicationCommandOption>()

  constructor(name: string, description: string) {
    this.name = name
    this.description = description
  }

  /**
   * Creates a new sub-command-group which can contain sub-commands.
   */
  static fromSubGroupMetadata(metadata: SubGroupMetadata) {
    return new SubCommandGroup(metadata.name, metadata.description)
  }

  addSubCommand(subCommand: SubCommand) {
    if (this.options.has(subCommand.name)) {
      throw new Error(
        `Sub-command-group "${this.name}" already has an option named "${subCommand.name}"`
      )
    }

    this.options.set(subCommand.name, subCommand)
  }

  toJSON(): APIApplicationCommandSubcommandGroupOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
    }
  }
}
