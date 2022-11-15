import { HttpStatus, Injectable } from '@nestjs/common';
import { ProfileEndpoint, WoWClient } from '@rbp/battle.net';
import { isString } from '@rbp/shared';
import { Character } from './character.entity';
import { EndpointHandler } from './character.service';
import { CharacterStatus } from './embeddables/character-status.embeddable';
import { CharacterIdMismatchError } from './errors/character-id-mismatch.error';

export type ForEndpoints = Array<
  ProfileEndpoint | { endpoint: ProfileEndpoint; options?: any }
>;

export type EndpointRequest =
  | ProfileEndpoint
  | { endpoint: ProfileEndpoint; extraArgs?: Record<string, any> };

@Injectable()
export class CharacterOrchestrator {
  constructor(private readonly client: WoWClient) { }

  public getEndpointHandler<E extends ProfileEndpoint>(
    endpoint: E,
  ): EndpointHandler<E> {
    switch (endpoint) {
      case 'character-profile-status':
        return this.client.profile.getCharacterProfileStatus.bind(this);
      case 'character-profile-summary':
        return this.client.profile.getCharacterProfileSummary.bind(this);
      case 'character-media-summary':
        return this.client.profile.getCharacterMediaSummary.bind(this);
      case 'character-mythic-keystone-profile':
        return this.client.profile.getCharacterMythicKeystoneProfile.bind(this);
      case 'character-mythic-keystone-season':
        return this.client.profile.getCharacterMythicKeystoneSeason.bind(this);
      case 'character-raids':
        return this.client.profile.getCharacterRaids.bind(this);
      default:
        throw new Error(`Endpoint ${endpoint} is not yet implemented.`);
    }
  }

  private validateCharacter(character: Character, id: number, is_valid?: boolean) {
    if (!character.status) {
      throw new Error('Character status is not set.');
    }
  }

  public async getEndpoint(
    endpoint: ProfileEndpoint,
    character: Character,
    extraArgs: Record<string, any> = {},
  ) {
    const lastUpdatedAt = character.getStorage(endpoint)?.updatedAt;
    const handler = this.getEndpointHandler(endpoint);

    const response = await handler({
      name: character.name,
      realm: character.realm,
      region: character.region,
      ifModifiedSince: lastUpdatedAt,
      ...extraArgs,
    });

    // If the response isn't modified, reset the 30-day stale data retention period.
    // Note: `Got` does not throw an error if the response is a 304 Not Modified.
    if (response.statusCode === HttpStatus.NOT_MODIFIED) {
      character.getStorage(endpoint)!.updatedAt = new Date();
      return character;
    }

    const statusId
      = endpoint === 'character-profile-status'
        || endpoint === 'character-profile-summary'
        ? response.body.id
        : response.body.character.id;

    if (!character.status) {
      character.status = new CharacterStatus();
      character.status.id = statusId;
    }
    else if (character.status.id !== statusId) {
      character.deleteStorage(endpoint);
      throw new CharacterIdMismatchError();
    }

    character.status.updatedAt = new Date();
    const storage = character.getStorage(endpoint, true);
    storage.set(response.body);
    storage.updatedAt = new Date();

    return character;
  }

  /**
   * Collects data for a set of endpoints and applies them to a given character.
   */
  public getEndpoints(requests: EndpointRequest[], character: Character) {
    return Promise.all(
      requests.map((endpoint) => {
        if (isString(endpoint)) {
          return this.getEndpoint(endpoint, character);
        }
        return this.getEndpoint(
          endpoint.endpoint,
          character,
          endpoint.extraArgs,
        );
      }),
    );
  }
}
