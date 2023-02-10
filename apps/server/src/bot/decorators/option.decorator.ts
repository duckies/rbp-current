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

export interface BaseOptionMetadata {
  name: string
  description: string
  type: OptionType
  index: number
  required?: boolean
}

export interface StringOptionMetadata extends BaseOptionMetadata {
  type: 'String'
  min_length?: number
  max_length?: number
  autocomplete?: boolean
}

export interface ChannelOptionMetadata extends BaseOptionMetadata {
  type: 'Channel'
  types?: ChannelType[]
}

export interface NumberOptionMetadata extends BaseOptionMetadata {
  type: 'Number'
  min_value?: number
  max_value?: number
}

export interface IntegerOptionMetadata extends BaseOptionMetadata {
  type: 'Integer'
  min_value?: number
  max_value?: number
}

export type OptionMetadata =
  | StringOptionMetadata
  | ChannelOptionMetadata
  | NumberOptionMetadata
  | IntegerOptionMetadata

type Options = SetOptional<OptionMetadata, 'name' | 'description' | 'index' | 'type'>

export function Option(
  name: string,
  description: string,
  options: Options = {}
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
