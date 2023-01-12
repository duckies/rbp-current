export const DUPLICATE_OPTION = (commandName: string, name: string) =>
  `Cannot create option "${name}" for command "${commandName}", option already exists.`

export const MISSING_GROUP = (name: string) =>
  `Class "${name}" declared a subgroup without first declaring a group.`

export const MISSING_COMMAND = (name: string) =>
  `Method "${name}" declared UseGroups without declaring a command`

export const OPTION_MISSING_COMMAND = (name: string) =>
  `Method "${name}" declared an option without declaring a command or subcommand.`

export const COMMAND_TYPE_ERROR = (path: string[], wanted: string, found: string) =>
  `Expected "${wanted}" at path "${path.join(', ')} but found "${found}"}`
