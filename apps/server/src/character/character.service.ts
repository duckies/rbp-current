import { SqlEntityManager } from '@mikro-orm/knex'
import { Injectable } from '@nestjs/common'
import { ProfileEndpoint, ProfileEndpointResponseMap } from '@rbp/battle.net'
import { capitalize } from '@rbp/shared'
import { CancelableRequest, Response } from 'got-cjs'
import { Character } from './character.entity'
import { CharacterOrchestrator } from './character.orchestrator'
import { FindCharacterDTO } from './dto/find-character.dto'

export type EndpointHandler<E extends ProfileEndpoint> = (
  options: any
) => CancelableRequest<Response<ProfileEndpointResponseMap[E]>>

@Injectable()
export class CharacterService {
  public readonly repository

  constructor(
    public readonly em: SqlEntityManager,
    private readonly orchestrator: CharacterOrchestrator
  ) {
    this.repository = em.getRepository(Character)
  }

  /**
   * Inserts the basic character identifiers into the database.
   */
  public create(findCharacterDTO: FindCharacterDTO) {
    return this.repository.create({
      name: capitalize(findCharacterDTO.name),
      realm: findCharacterDTO.realm,
      region: findCharacterDTO.region,
    })
  }

  /**
   * Locates or creates a character and populates it with basic data.
   */
  public async upsert(findCharacterDTO: FindCharacterDTO) {
    let character = await this.repository.findOne({ ...findCharacterDTO })

    if (!character) {
      character = this.create(findCharacterDTO)
      this.em.persist(character)
    }

    await this.orchestrator.getEndpoints(
      [
        'character-profile-summary',
        'character-media-summary',
        'character-mythic-keystone-profile',
        'character-raids',
      ],
      character
    )

    await this.em.flush()

    return character
  }

  /**
   * Updates a character with the latest data from the Battle.net API
   * for the given character and endpoints.
   */
  public async patch(findCharacterDTO: FindCharacterDTO, endpoints: ProfileEndpoint[]) {
    const character = await this.repository.findOneOrFail({
      name: capitalize(findCharacterDTO.name),
      realm: findCharacterDTO.realm,
      region: findCharacterDTO.region,
    })

    await this.orchestrator.getEndpoints(endpoints, character)

    await this.em.flush()

    return character
  }

  public async delete(findCharacterDTO: FindCharacterDTO) {
    const character = await this.repository.findOneOrFail({ ...findCharacterDTO })
    return this.repository.remove(character).flush()
  }
}
