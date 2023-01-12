import {
  APIApplicationCommandBasicOption,
  APIApplicationCommandOption,
  ApplicationCommandOptionType,
} from 'discord.js'

export abstract class BasicCommandOption {
  public abstract readonly type: ApplicationCommandOptionType
  public abstract readonly name: string
  public abstract readonly description: string
  public abstract readonly required?: boolean

  public abstract toJSON(): APIApplicationCommandBasicOption
}

export abstract class CommandOption {
  public abstract readonly type: ApplicationCommandOptionType
  public abstract readonly name: string
  public abstract readonly description: string

  public abstract toJSON(): APIApplicationCommandOption
}
