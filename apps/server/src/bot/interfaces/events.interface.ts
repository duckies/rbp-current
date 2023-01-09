import { ClientEvents } from 'discord.js'
import { Constructor } from '../../common/interfaces'

export type Event = keyof ClientEvents

export interface EventHandler {
  instance: Constructor<any>
  method: Function
}
