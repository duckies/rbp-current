import type { WoWClient } from '../client';
import type { ProfileOptions } from '../interfaces/profile-options.interface';
import type {
  CharacterMediaSummary,
  CharacterMythicKeystoneSeason,
  CharacterProfileStatus,
  CharacterProfileSummary,
  CharacterRaids,
} from './interfaces';
import type { CharacterMythicKeystoneProfile } from './interfaces/character-mythic-keystone-profile-index.interface';

export class ProfileAPIClient {
  constructor(private readonly client: WoWClient) { }

  /**
   * Character Profile API — Character Profile Status
   */
  getCharacterProfileStatus(options: ProfileOptions) {
    return this.client.get<CharacterProfileStatus>({
      path: `profile/wow/character/${options.realm
        }/${options.name.toLowerCase()}/status`,
      namespace: 'profile',
      ...options,
    });
  }

  /**
   * Character Profile API — Character Profile Summary
   */
  getCharacterProfileSummary(options: ProfileOptions) {
    return this.client.get<CharacterProfileSummary>({
      path: `profile/wow/character/${options.realm
        }/${options.name.toLowerCase()}`,
      namespace: 'profile',
      ...options,
    });
  }

  /**
   * Character Profile API — Character Media Summary
   */
  getCharacterMediaSummary(options: ProfileOptions) {
    return this.client.get<CharacterMediaSummary>({
      path: `profile/wow/character/${options.realm
        }/${options.name.toLowerCase()}/character-media`,
      namespace: 'profile',
      ...options,
    });
  }

  /**
   * Character Profile API — Character Mythic Keystone Profile Index
   */
  getCharacterMythicKeystoneProfile(options: ProfileOptions) {
    return this.client.get<CharacterMythicKeystoneProfile>({
      path: `profile/wow/character/${options.realm
        }/${options.name.toLowerCase()}/mythic-keystone-profile`,
      namespace: 'profile',
      ...options,
    });
  }

  /**
   * Character Profile API — Character Mythic Keystone Season Details
   */
  getCharacterMythicKeystoneSeason(
    options: ProfileOptions & { season: number },
  ) {
    return this.client.get<CharacterMythicKeystoneSeason>({
      path: `profile/wow/character/${options.realm
        }/${options.name.toLowerCase()}/mythic-keystone-profile/season/${options.season
        }`,
      namespace: 'profile',
      ...options,
    });
  }

  getCharacterRaids(options: ProfileOptions) {
    return this.client.get<CharacterRaids>({
      path: `profile/wow/character/${options.realm}/${options.name.toLowerCase()}/encounters/raids`,
      namespace: 'profile',
      ...options,
    });
  }
}
