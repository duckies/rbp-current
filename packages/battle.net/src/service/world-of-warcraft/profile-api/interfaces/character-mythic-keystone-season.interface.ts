import type { KeyNameId, LinkedResource } from '../../interfaces';
import type { KeystoneRating } from './character-mythic-keystone-profile-index.interface';
import type { Character } from './character.interface';

export interface KeystoneMember {
  character: Character
  specialization: KeyNameId
  race: KeyNameId
  equipped_item_level: number
}

export interface KeystoneRun {
  completed_timestamp: number
  duration: number
  keystone_level: number
  keystone_affixes: KeyNameId[]
  members: KeystoneMember[]
  dungeon: KeyNameId
  is_completed_within_time: boolean
  mythic_rating: KeystoneRating
  map_rating: KeystoneRating
}

export interface CharacterMythicKeystoneSeason extends LinkedResource {
  season: KeyNameId
  best_runs: KeystoneRun[]
  character: Character
  mythic_rating: KeystoneRating
}
