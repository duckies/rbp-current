import { CharacterProfileStatus } from '@rbp/battle.net'
import { describe, test } from 'vitest'
import { Character } from './character.entity'

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
    }

    const character = new Character()
    character.name = 'test'
    character.realm = 'blackrock'
    character.region = 'us'
  })
})
