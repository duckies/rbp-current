import { CharacterProfileStatus } from '@rbp/battle.net';
import nock from 'nock';
import { describe, test } from 'vitest';
import { Character } from './character.entity';

describe('CharacterOrchestrator', () => {
  test('getEndpoint should add a statusId to a fresh character', async () => {
    const status: CharacterProfileStatus = {
      _links: {
        self: {
          href: 'https://localhost/',
        },
      },
      id: 123456789,
      is_valid: true,
    };

    const character = new Character();
    character.name = 'test';
    character.realm = 'blackrock';
    character.region = 'us';

    // Incomplete.
    // Maybe I should just mock the API to avoid the authentication layer?
    nock('https://us.api.blizzard.com/')
      .get(`profile/wow/character/${character.realm}/${character.name}/status`)
      .reply(200, status);
  });
});
