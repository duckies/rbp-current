import { ApplicationCommandOptionType } from 'discord.js'
import { NumberOptionMetadata } from '../../decorators/option.decorator'
import { BasicCommandOption } from '../command-option.class'

export class NumberOption extends BasicCommandOption {
  public readonly type = ApplicationCommandOptionType.Number
  public readonly name: string
  public readonly description: string
  public readonly required?: boolean
  public readonly min_value?: number
  public readonly max_value?: number

  constructor({ name, description, required }: NumberOptionMetadata) {
    super()
    this.name = name
    this.description = description
    this.required = required
  }

  toJSON() {
    return {
      ...this,
    }
  }
}
