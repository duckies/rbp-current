import type { LinkedResource } from '../../interfaces';
import type { Character } from './character.interface';

export interface Asset {
  key: string
  value: string
}

export interface CharacterMediaSummary extends LinkedResource {
  character: Character
  assets: Asset[]
}
