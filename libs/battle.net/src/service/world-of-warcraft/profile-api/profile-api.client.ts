import type { WoWClient } from '../client';
import type { ProfileOptions } from '../interfaces/profile-options.interface';

export class ProfileAPIClient {
  constructor(private readonly client: WoWClient) { }

  /**
   * Character Profile API - Character Profile Summary
   */
  getCharacterProfileSummary(options: ProfileOptions) {
    return this.client.get<any>({
      path: `profile/wow/character/${encodeURIComponent(
        options.realm,
      )}/${encodeURIComponent(options.name)}`,
      namespace: 'profile',
      ...options,
    });
  }
}
