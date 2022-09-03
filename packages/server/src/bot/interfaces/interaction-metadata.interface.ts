import type { InteractionType } from 'discord.js'

export interface InteractionMetadataBase {
  interactionType: InteractionType
}

export interface ApplicationCommandChatInput extends InteractionMetadataBase {
  name: string
  description: string
}
