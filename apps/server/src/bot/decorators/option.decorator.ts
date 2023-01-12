import { SetOptional } from '@rbp/shared'
import { ChannelType } from 'discord.js'
import { BOT_OPTIONS } from '../bot.constants'

export const OptionTypes = {
  String: 3,
  Integer: 4,
  Boolean: 5,
  User: 6,
  Channel: 7,
  Role: 8,
  Mentionable: 9,
  Number: 10,
} as const

export type OptionType = keyof typeof OptionTypes

export interface OptionMetadata {
  name: string
  description: string
  type: OptionType
  index: number
  required?: boolean
}

export interface StringOptionMetadata extends OptionMetadata {
  min_length?: number
  max_length?: number
  autocomplete?: boolean
}

export interface ChannelOptionMetadata extends OptionMetadata {
  types?: ChannelType
}

export function Option(
  name: string,
  description: string,
  options: SetOptional<Omit<OptionMetadata, 'name' | 'description' | 'index'>, 'type'> = {}
): ParameterDecorator {
  return (target: object, key: string | symbol, index) => {
    let type = options.type

    if (!type) {
      const metatype = Reflect.getMetadata('design:paramtypes', target, key)[index]?.name

      if (!(metatype in OptionTypes)) {
        let message = `Option type (${metatype}) is not one of the supported types (${Object.keys(
          OptionTypes
        ).join(', ')})`

        if (metatype === 'Object') {
          message +=
            "\nType inference is not supported and you must explicity specify the type to avoid this error, e.g. `message: string = 'Welcome!'`"
        }
        throw new Error(message)
      }

      type = metatype
    }

    const metadata = Reflect.getMetadata(BOT_OPTIONS, target, key) || []

    Reflect.defineMetadata(
      BOT_OPTIONS,
      [
        ...metadata,
        {
          name,
          description,
          ...options,
          index,
          type,
        },
      ],
      target,
      key
    )
  }
}
