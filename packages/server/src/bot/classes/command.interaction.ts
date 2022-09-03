import {
  ApplicationCommandType,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js'
import { CommandMetadata } from '../decorators/command.decorator'
import { GroupMetadata } from '../decorators/group.decorator'
import { SubGroupMetadata } from '../decorators/sub-group.decorator'
import { CommandOption } from '../interfaces'
import { SubCommandGroup } from './sub-command-group.interaction'
import { SubCommand } from './sub-command.interaction'

export class Command {
  public readonly type = ApplicationCommandType.ChatInput
  public readonly name: string
  public readonly description: string
  public readonly methodRef?: Function
  public readonly options = new Map<string, CommandOption>()

  constructor(name: string, description: string, method?: Function) {
    this.name = name
    this.description = description
    this.methodRef = method
  }

  /**
   * Creates a new group, which is an alias to a root command for child sub-commands.
   *
   * This command **cannot** have a method, only sub-commands or sub-command-groups.
   */
  static fromGroupMetadata(metadata: GroupMetadata) {
    return new Command(metadata.name, metadata.description)
  }

  /**
   * Creates a new standalone command that has a method.
   *
   * This command **cannot** have any sub-commands or sub-command-groups.
   */
  static fromCommandMetadata(metadata: CommandMetadata, method: Function) {
    return new Command(metadata.name, metadata.description, method)
  }

  addSubCommandGroup(metadata: SubGroupMetadata) {
    if (this.options.has(metadata.name)) {
      throw new Error(
        `Command "${this.name} already has an option named "${metadata.name}"`
      )
    }

    const subCommandGroup = SubCommandGroup.fromSubGroupMetadata(metadata)

    this.options.set(metadata.name, subCommandGroup)

    return subCommandGroup
  }

  addSubCommand(metadata: CommandMetadata, methodRef: Function) {
    if (this.options.has(metadata.name)) {
      throw new Error(
        `Command "${this.name} already has an option named "${metadata.name}"`
      )
    }

    const subCommand = SubCommand.fromCommandMetadata(metadata, methodRef)

    this.options.set(metadata.name, subCommand)

    return subCommand
  }

  getOption(name: string, type: 'group') {
    const command = this.options.get(name)

    switch (type) {
      case 'group': {
        if (command instanceof SubCommandGroup) {
          return command
        }
      }
    }

    return command
  }

  toJSON(): RESTPostAPIChatInputApplicationCommandsJSONBody {
    return {
      type: this.type,
      name: this.name,
      description: this.description,
      options: Array.from(this.options.values(), (option) => option.toJSON()),
    }
  }
}
