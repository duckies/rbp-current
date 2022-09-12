import {
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
} from 'discord.js'

export interface ApplicationCommandOption<
  T extends ApplicationCommandOptionType = any
> {
  type: T
  options: Map<string, ApplicationCommandOption>
  toJSON: () => APIApplicationCommandOption
}
