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

export function Option(
  name: string,
  description: string,
  options: Omit<OptionMetadata, 'name' | 'description' | 'type' | 'index'> = {}
): ParameterDecorator {
  return (target: object, key: string | symbol, index) => {
    const metatype = Reflect.getMetadata('design:paramtypes', target, key)[index]?.name

    if (!(name in OptionTypes)) {
      let message = `Option type (${metatype}) is not one of the supported types (${Object.keys(
        OptionTypes
      ).join(', ')})`

      if (metatype === 'Object') {
        message +=
          "\nType inference is not supported and you must explicity specify the type to avoid this error, e.g. `message: string = 'Welcome!'`"
      }
      throw new Error(message)
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
          type: metatype,
        },
      ],
      target,
      key
    )
  }
}
