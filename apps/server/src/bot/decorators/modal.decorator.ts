import { BOT_MODAL } from '../bot.constants'

export interface ModalMetadata {
  /**
   * The custom id of the modal.
   *
   * TODO: This should accept wildcards.
   */
  id: string
  title: string
}

/**
 * Decorates a method to handle the response to a modal by its id.
 */
export function OnModal(id: string, title: string): MethodDecorator {
  return (_target, _key, descriptor: PropertyDescriptor) => {
    const metadata: ModalMetadata = { id, title }

    Reflect.defineMetadata(BOT_MODAL, metadata, descriptor.value)

    return descriptor
  }
}
