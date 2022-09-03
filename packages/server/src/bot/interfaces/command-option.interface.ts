import {
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
} from 'discord.js'

export interface CommandOption<T extends ApplicationCommandOptionType = any> {
  type: T
  options: Map<string, CommandOption>
  toJSON: () => APIApplicationCommandOption
}
