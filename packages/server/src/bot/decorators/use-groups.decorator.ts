import { BOT_USE_GROUPS } from '../bot.constants'

export interface UseGroupsMetadata {
  groupName: string
  subGroupName?: string
}

export function UseGroups(
  groupName: string,
  subGroupName?: string
): MethodDecorator {
  const metadata: UseGroupsMetadata = { groupName, subGroupName }

  return (
    target: any,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    Reflect.defineMetadata(BOT_USE_GROUPS, metadata, descriptor.value)
    return descriptor
  }
}
