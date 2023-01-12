import { ApplicationCommandOptionType, ChannelType } from 'discord.js'
import { ChannelOptionMetadata } from '../../decorators/option.decorator'
import { BasicCommandOption } from '../command-option.class'

export class ChannelOption extends BasicCommandOption {
  public readonly type = ApplicationCommandOptionType.Channel
  public readonly name: string
  public readonly description: string
  public readonly required?: boolean
  public readonly types?: ChannelType

  constructor({ name, description, required, types }: ChannelOptionMetadata) {
    super()
    this.name = name
    this.description = description
    this.required = required
    this.types = types
  }

  toJSON() {
    return {
      ...this,
    }
  }
}
