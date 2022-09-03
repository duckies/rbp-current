import { BOT_GROUP } from '../bot.constants'

export interface GroupMetadata {
  name: string
  description: string
}

/**
 * Creates a new root Discord slash command for 2nd-level subcommands.
 */
export function Group(name: string, description: string): ClassDecorator {
  return (target: any) => {
    Reflect.defineMetadata(BOT_GROUP, { name, description }, target)

    return target
  }
}
