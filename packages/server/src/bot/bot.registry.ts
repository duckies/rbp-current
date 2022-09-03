import { Injectable } from '@nestjs/common'
import { Command } from './classes/command.interaction'
import { CommandNotFoundException } from './exceptions/command-not-found.exception'
import { CommandOption } from './interfaces'

@Injectable()
export class BotRegistry {
  public readonly commands = new Map<string, Command | CommandOption>()

  add(command: Command) {
    if (this.commands.has(command.name)) {
      throw new Error(`Duplicate root command name ${command.name}`)
    }

    this.commands.set(command.name, command)

    return command
  }

  get(path: string[]) {
    let pointer = this.commands.get(path[0])

    for (let i = 1; i < path.length && pointer; i++) {
      pointer = pointer.options.get(path[i])
    }

    if (!pointer) {
      throw new CommandNotFoundException()
    }

    return pointer
  }
}
