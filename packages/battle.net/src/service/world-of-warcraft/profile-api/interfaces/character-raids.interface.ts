import type { Enum, KeyNameId, LinkedResource } from '../../interfaces';
import type { Character } from './character.interface';

export interface CharacterInstanceEncounters {
  encounter: KeyNameId
  completed_count: number
  last_kill_timestamp: number
}

export interface CharacterInstanceMode {
  difficulty: Enum
  status: Enum<'Complete' | 'In Progress'>
  progress: {
    completed_count: number
    total_count: number
    encounters: CharacterInstanceEncounters[]
  }
}

export interface CharacterExpansionInstance {
  instance: KeyNameId
  modes: CharacterInstanceMode[]
}

export interface CharacterRaidExpansion {
  expansion: KeyNameId
  instances: CharacterExpansionInstance[]
}

export interface CharacterRaids extends LinkedResource {
  character: Character
  expansions?: CharacterRaidExpansion[]
}
