import type { InteractionType } from 'discord.js'
import type { Dictionary } from '../../common/interfaces'

export interface Interaction {
  type: InteractionType
  toJSON: () => Dictionary<any>
}
