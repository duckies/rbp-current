import { ApplicationCommandOptionType } from 'discord.js'
import { StringOptionMetadata } from '../../decorators/option.decorator'
import { BasicCommandOption } from '../command-option.class'

export class StringOption extends BasicCommandOption {
  public readonly type = ApplicationCommandOptionType.String
  public readonly name: string
  public readonly description: string
  public readonly required?: boolean
  public readonly min_length?: number
  public readonly max_length?: number
  public readonly autocomplete?: boolean

  constructor({
    name,
    description,
    required,
    min_length,
    max_length,
    autocomplete,
  }: StringOptionMetadata) {
    super()
    this.name = name
    this.description = description
    this.required = required
    this.min_length = min_length
    this.max_length = max_length
    this.autocomplete = autocomplete
  }

  toJSON() {
    return {
      ...this,
    }
  }
}
