import {
  APIApplicationCommandSubcommandOption,
  ApplicationCommandOptionType,
  ChatInputCommandInteraction,
} from 'discord.js'
import { CommandMetadata } from '../decorators'
import { BasicCommandOption, CommandOption } from './command-option.class'

export class SubCommand extends CommandOption {
  public readonly type = ApplicationCommandOptionType.Subcommand
  public readonly name: string
  public readonly description: string
  public readonly methodRef: Function
  public readonly options = new Map<string, BasicCommandOption>()

  constructor({ name, description }: CommandMetadata, method: Function) {
    super()
    this.name = name
    this.description = description
    this.methodRef = method
  }

  getInteractionOptions(interaction: ChatInputCommandInteraction) {
    return [...this.options.values()].map((option) => {
      switch (option.type) {
        case ApplicationCommandOptionType.String:
          return interaction.options.getString(option.name, option.required)
        case ApplicationCommandOptionType.Integer:
          return interaction.options.getInteger(option.name, option.required)
        case ApplicationCommandOptionType.Boolean:
          return interaction.options.getBoolean(option.name, option.required)
        case ApplicationCommandOptionType.User:
          return interaction.options.getUser(option.name, option.required)
        case ApplicationCommandOptionType.Channel:
          return interaction.options.getChannel(option.name, option.required)
        case ApplicationCommandOptionType.Role:
          return interaction.options.getRole(option.name, option.required)
        case ApplicationCommandOptionType.Mentionable:
          return interaction.options.getMentionable(option.name, option.required)
        case ApplicationCommandOptionType.Number:
          return interaction.options.getNumber(option.name, option.required)
        default:
          throw new Error(`Unexpected SubCommand option type — ${option.type}`)
      }
    })
  }

  addOption(option: BasicCommandOption) {
    if (this.options.has(option.name)) {
      throw new Error(`Duplicate option ${option.name} for subcommand ${this.name}`)
    }
    this.options.set(option.name, option)
  }

  toJSON(): APIApplicationCommandSubcommandOption {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      options: [...this.options.values()].map((o) => o.toJSON()),
    }
  }
}
