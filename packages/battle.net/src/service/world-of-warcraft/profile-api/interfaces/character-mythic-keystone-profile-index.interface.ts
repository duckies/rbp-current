import type { Color, KeyId, LinkedResource } from '../../interfaces';
import type { Character } from './character.interface';

export interface KeystoneRating {
  color: Color
  rating: number
}

export interface CharacterMythicKeystoneProfile extends LinkedResource {
  current_period: KeyId
  seasons: KeyId[]
  character: Character
  current_mythic_rating?: KeystoneRating
}
