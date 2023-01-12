import { BasicCommandOption, SubCommand, SubCommandGroup } from '../commands'

export type CommandOption = SubCommand | SubCommandGroup | BasicCommandOption
