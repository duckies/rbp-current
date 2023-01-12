import { BOT_SUBGROUP } from '../bot.constants'

export interface SubCommandGroupMetadata {
  name: string
  description: string
}

export function SubGroup(name: string, description: string): ClassDecorator {
  return (target: any) => {
    const metadata = Reflect.getMetadata(BOT_SUBGROUP, target) || []
    Reflect.defineMetadata(BOT_SUBGROUP, [...metadata, { name, description }], target)

    return target
  }
}
