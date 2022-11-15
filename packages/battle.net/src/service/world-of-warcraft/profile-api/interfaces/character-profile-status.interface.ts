import type { LinkedResource } from '../../interfaces';

export interface CharacterProfileStatus extends LinkedResource {
  id: number
  is_valid: boolean
}
