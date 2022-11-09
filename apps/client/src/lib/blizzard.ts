import type { CharacterProfileSummary } from '@rbp/battle.net';
import type { FindCharacterDTO } from '@rbp/server';
import { $get } from 'lib/utils/fetch';

export function getCharacter({ name, realm, region }: FindCharacterDTO) {
  return $get<CharacterProfileSummary>(`/blizzard/character/${region}/${realm}/${name}`);
}
