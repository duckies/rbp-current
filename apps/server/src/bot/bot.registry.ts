import { Injectable } from '@nestjs/common'
import { isArray } from '@rbp/shared'
import { ClientEvents } from 'discord.js'
import { Command } from './classes/command.interaction'
import { CommandNotFoundException, InteractionConflictException } from './exceptions'
import { AnyInteractionType, ApplicationCommandOption } from './interfaces'

@Injectable()
export class BotRegistry {
  public readonly commands = new Map<string, Command | ApplicationCommandOption>()
  public readonly events = new Map<keyof ClientEvents, Function[]>()

  add(command: Command) {
    if (this.commands.has(command.name)) {
      throw new Error(`Duplicate root command name ${command.name}`)
    }

    this.commands.set(command.name, command)

    return command
  }

  addEvent(event: keyof ClientEvents, method: Function) {
    const events = this.events.get(event)

    if (events) {
      events.push(method)
    } else {
      this.events.set(event, [method])
    }
  }

  /**
   * Traverses the command tree to find the node at the
   * end of the path or throws a `CommandNotFoundException`.
   */
  get(path: string[], type?: AnyInteractionType | AnyInteractionType[]) {
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
}
