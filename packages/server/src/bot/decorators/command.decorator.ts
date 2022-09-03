import { Snowflake } from 'discord.js'
import { BOT_COMMAND } from '../bot.constants'

export interface CommandMetadata {
  name: string
  description: string
  guildId?: Snowflake
}

/**
 * Describes a new standalone bot command or command root.
 */
export function Command(name: string, description: string): MethodDecorator {
  const metadata: CommandMetadata = { name, description }

  return (
    target: any,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    Reflect.defineMetadata(BOT_COMMAND, metadata, descriptor.value)
    return descriptor
  }
}
