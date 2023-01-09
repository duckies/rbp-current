import { BOT_EVENT } from '../bot.constants'
import { Event } from '../interfaces/events.interface'

/**
 * Decorates a method to handle a Discord client event.
 */
export function OnEvent(event: Event): MethodDecorator {
  return (_target, _key, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(BOT_EVENT, event, descriptor.value)
    return descriptor
  }
}
