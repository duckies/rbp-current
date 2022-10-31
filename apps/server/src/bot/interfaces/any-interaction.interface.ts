import type {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  InteractionType,
} from 'discord.js'

export type AnyInteractionType =
  | InteractionType
  | ApplicationCommandType
  | ApplicationCommandOptionType
