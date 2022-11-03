import { SqlEntityManager } from '@mikro-orm/knex';
import { Injectable, Logger } from '@nestjs/common';
import { ProfileEndpoint, WoWClient } from '@rbp/battle.net';
import { capitalize } from '@rbp/shared';
import { Character } from './character.entity';
import { FindCharacterDTO } from './dto/character.dto';
import { CharacterIdMismatchError } from './errors/character-id-mismatch.error';

@Injectable()
export class CharacterService {
  private readonly logger = new Logger(CharacterService.name);
  public readonly repository;

  constructor(
    public readonly em: SqlEntityManager,
    private readonly client: WoWClient,
  ) {
    this.repository = em.getRepository(Character);
  }

  /**
   * Inserts the basic character identifiers into the database.
   */
  public async create(findCharacterDTO: FindCharacterDTO) {
    return this.repository.create({
      name: capitalize(findCharacterDTO.name),
      realm: findCharacterDTO.realm,
      region: findCharacterDTO.region,
    });
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
    });

    const promises = endpoints.map((endpoint) => {
      switch (endpoint) {
        case ProfileEndpoint.CharacterProfileSummary:
          return this.getCharacterProfileSummary(character);
        default:
          return Promise.resolve();
      }
    });

    return Promise.all(promises);
  }

  public async getCharacterProfileSummary(character: Character) {
    // TODO: ifModifiedSince: character.summary?.updated_at
    const response = await this.client.profile.getCharacterProfileSummary(
      { ...character },
    );

    // Note: Newly added characters may not have a `status.id` yet.
    if (character.status && character.status.id !== response.body.id) {
      throw new CharacterIdMismatchError();
    }

    // const data = {
    //   achievement_points: response.body.achievement_points,
    //   gender: response.body.gender.name,
    //   faction: response.body.faction.name,
    //   average_ilvl: response.body.average_item_level,
    //   equipped_ilvl: response.body.equipped_item_level,
    //   level: response.body.level,
    //   logout_at: new Date(response.body.last_login_timestamp),
    //   raceId: response.body.race.id,
    //   raceName: response.body.race.name,
    //   specId: response.body.active_spec?.id,
    //   specName: response.body.active_spec?.name,
    //   updated_at: new Date(),
    //   title: response.body.active_title?.name,
    // };

    // return this.prisma.character.update({
    //   where: {
    //     name_realm_region: {
    //       name: capitalize(character.name),
    //       realm: character.realm,
    //       region: character.region,
    //     },
    //   },
    //   data: {
    //     status_id: (character.status_id === null ? response.body.id : undefined),
    //     summary: {
    //       upsert: {
    //         create: { ...data },
    //         update: data,
    //       },
    //     },
    //   },
    //   include: { summary: true },
    // });
  }

  public async delete(findCharacterDTO: FindCharacterDTO) {
    const character = await this.repository.findOneOrFail(findCharacterDTO);
    return this.repository.remove(character).flush();
  }
}
