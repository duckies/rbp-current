export const DUPLICATE_OPTION = (commandName: string, name: string) =>
  `Cannot create option "${name}" for command "${commandName}", option already exists.`;

export const MISSING_GROUP = (name: string) =>
  `Class "${name}" declared a subgroup without first declaring a group.`;

export const MISSING_COMMAND = (name: string) =>
  `Method "${name}" declared UseGroups without declaring a command`;
