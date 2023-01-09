import { Constructor } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { isArray } from '@rbp/shared'
import { Command } from './classes/command.interaction'
import { CommandNotFoundException, InteractionConflictException } from './exceptions'
import { AnyInteractionType, ApplicationCommandOption } from './interfaces'
import { Event, EventHandler } from './interfaces/events.interface'

@Injectable()
export class BotRegistry {
  public readonly commands = new Map<string, Command | ApplicationCommandOption>()
  public readonly events = new Map<Event, EventHandler[]>()

  addCommand(command: Command) {
    if (this.commands.has(command.name)) {
      throw new Error(`Duplicate root command name ${command.name}`)
    }

    this.commands.set(command.name, command)

    return command
  }

  /**
   * Traverses the command tree to find the node at the
   * end of the path or throws a `CommandNotFoundException`.
   */
  getCommand(path: string[], type?: AnyInteractionType | AnyInteractionType[]) {
    let pointer = this.commands.get(path[0])

    for (let i = 1; i < path.length && pointer; i++) {
      pointer = pointer.options.get(path[i])
    }

    if (!pointer) {
      throw new CommandNotFoundException()
    } else if (type && (isArray(type) ? !type.includes(pointer.type) : type !== pointer.type)) {
      throw new InteractionConflictException()
    }

    return pointer
  }

  addEvent(event: Event, instance: Constructor, method: Function) {
    const handler = this.events.get(event)

    if (handler) {
      handler.push({ instance, method })
    } else {
      this.events.set(event, [{ instance, method }])
    }
  }
}
