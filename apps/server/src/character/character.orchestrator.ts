import { Injectable } from '@nestjs/common';
import { ProfileEndpoint, WoWClient } from '@rbp/battle.net';
import { Character } from './character.entity';
import { EndpointHandler } from './character.service';
import { CharacterStatus } from './embeddables/character-status.embeddable';
import { CharacterIdMismatchError } from './errors/character-id-mismatch.error';

export type ForEndpoints = Array<ProfileEndpoint | { endpoint: ProfileEndpoint; options?: any }>;

@Injectable()
export class CharacterOrchestrator {
  constructor(private readonly client: WoWClient) { }

  public getEndpointHandler<E extends ProfileEndpoint>(endpoint: E): EndpointHandler<E> {
    switch (endpoint) {
      case 'character-profile-status':
        return this.client.profile.getCharacterProfileStatus.bind(this.client.profile);
      case 'character-profile-summary':
        return this.client.profile.getCharacterProfileSummary.bind(this);
      case 'character-media-summary':
        return this.client.profile.getCharacterMediaSummary.bind(this.client.profile);
      default:
        throw new Error(`Endpoint ${endpoint} is not yet implemented.`);
    }
  }

  public async getEndpoint(endpoint: ProfileEndpoint, character: Character) {
    const lastUpdatedAt = character.getStorage(endpoint)?.updatedAt;
    const handler = this.getEndpointHandler(endpoint);

    const response = await handler({
      name: character.name,
      realm: character.realm,
      region: character.region,
      ifModifiedSince: lastUpdatedAt,
    });

    const statusId = endpoint === 'character-profile-status' || endpoint === 'character-profile-summary'
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

  getEndpoints(endpoints: ProfileEndpoint[], character: Character) {
    return Promise.all(endpoints.map(endpoint => this.getEndpoint(endpoint, character)));
  }
}
