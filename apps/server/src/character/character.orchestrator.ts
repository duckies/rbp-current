import { Injectable } from '@nestjs/common';
import { ProfileEndpoint, WoWClient } from '@rbp/battle.net';
import { Character } from './character.entity';
import { CharacterService } from './character.service';

export type ForEndpoints = Array<ProfileEndpoint | { endpoint: ProfileEndpoint; options?: any }>;

@Injectable()
export class CharacterOrchestrator {
  constructor(private readonly characterService: CharacterService,
    private readonly client: WoWClient) { }

  /**
   * Character Updating Procedure
   *
   * 1. Fetch the character by { name, realm, region } or throw.
   * 2. For a given arroy of endpoints
   */

  public getEndpointHandler(endpoint: ProfileEndpoint) {
    switch (endpoint) {
      case ProfileEndpoint.CharacterProfileSummary:
        return this.client.profile.getCharacterProfileSummary;
      case ProfileEndpoint.CharacterMediaSummary:
        return this.client.profile.getCharacterMediaSummary;
      case ProfileEndpoint.CharacterMythicKeystoneProfile:
        return this.client.profile.getCharacterMythicKeystoneProfile;
      case ProfileEndpoint.CharacterMythicKeystoneSeason:
        return this.client.profile.getCharacterMythicKeystoneSeason;
    }
  }

  public async getCharacterProfileSummary(character: Character) {
    const response = await this.client.profile.getCharacterProfileSummary({
      name: character.name,
      realm: character.realm,
      region: character.region,
    });

    // The endpoint data is unchanged.
    if (response.statusCode === 304) {
      // The only way we get a 304 is if we used ifModifiedSince,
      // so the summary should be defined.
      character.summary!.updatedAt = new Date();

      await this.characterService.repository.flush();
    }
  }
}
