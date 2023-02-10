import { Constructor } from '@mikro-orm/core'
import { Injectable } from '@nestjs/common'
import { isArray, MaybeArray } from '@rbp/shared'
import { BasicCommandOption, CommandOption, SubCommand, SubCommandGroup } from './commands'
import { Command } from './commands/command.interaction'
import { CommandNotFoundException } from './exceptions'
import { CommandMismatchException } from './exceptions/command-mismatch.exception'
import { Event, EventHandler } from './interfaces/events.interface'

type CommandType = 'Command' | 'ExecutableCommand' | 'SubCommandGroup' | 'SubCommand' | 'Option'

interface CommandTypeMap {
  Command: Command
  ExecutableCommand: Command & { methodRef: Function }
  SubCommandGroup: SubCommandGroup
  SubCommand: SubCommand
  Option: BasicCommandOption
}

const CommandTypeValidatorMap: {
  [key in CommandType]: (val: unknown) => val is CommandTypeMap[key]
} = {
  Command: (val: unknown): val is Command => val instanceof Command,
  ExecutableCommand: (val: unknown): val is Command & { methodRef: Function } =>
    val instanceof Command && !!val.methodRef,
  SubCommandGroup: (val: unknown): val is SubCommandGroup => val instanceof SubCommandGroup,
  SubCommand: (val: unknown): val is SubCommand => val instanceof SubCommand,
  Option: (val: unknown): val is BasicCommandOption => val instanceof BasicCommandOption,
}

type ValidatedCommandReturnType<T extends MaybeArray<CommandType>> = T extends keyof CommandTypeMap
  ? CommandTypeMap[T]
  : T extends CommandType[]
  ? CommandTypeMap[T[number]]
  : never

@Injectable()
export class BotRegistry {
  public readonly commands = new Map<string, Command>()
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
  getCommand<T extends MaybeArray<CommandType>>(
    path: string[],
    type?: T
  ): ValidatedCommandReturnType<T> {
    let pointer: Command | CommandOption | undefined = this.commands.get(path[0])

    for (let i = 1; i < path.length && pointer && 'options' in pointer; i++) {
      pointer = pointer.options.get(path[i])
    }

    if (!pointer) {
      console.log('Could not find', path, type)
      throw new CommandNotFoundException()
    }

    if (type) {
      const types: CommandType[] = isArray(type) ? type : [type]

      if (!types.some((t) => CommandTypeValidatorMap[t](pointer))) {
        throw new CommandMismatchException(
          `Expected ${types.join(' or ')}, got ${pointer.constructor.name}`
        )
      }
    }

    return pointer as any
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
