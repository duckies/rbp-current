import type { CharacterDTO } from '@rbp/server';
import { $fetch } from 'lib/utils/fetch';

export function getCharacter({ name, realm, region }: CharacterDTO) {
  return $fetch(`/blizzard/character/${region}/${realm}/${name}`);
}
