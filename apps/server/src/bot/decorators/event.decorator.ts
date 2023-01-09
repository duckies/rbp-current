import type { ClientEvents } from 'discord.js'
import { BOT_EVENT } from '../bot.constants'

/**
 * Decorates a method to handle a Discord client event.
 */
export function Event(event: keyof ClientEvents): MethodDecorator {
  return (_target, _key, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(BOT_EVENT, event, descriptor.value)
    return descriptor
  }
}
