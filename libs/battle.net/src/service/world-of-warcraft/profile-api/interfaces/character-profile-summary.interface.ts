import type { DisplayKeyNameId, Enum, LinkedResource, NameId } from '../../interfaces';

export interface CharacterProfileSummary extends LinkedResource {
  id: number
  name: string
  gender: Enum<'Male' | 'Female'>
  faction: Enum<'Alliance' | 'Horde'>
  race: NameId
  active_spec?: NameId
  guild?: unknown
  level: number
  experience: number
  achievement_points: number
  last_login_timestamp: number
  average_item_level: number
  equipped_item_level: number
  active_title?: DisplayKeyNameId
  // covenant_progress Ignored as it's no longer useful information.
}
