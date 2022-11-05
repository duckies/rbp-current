import { BattleNetClient } from '../../core/client';
import type { ClientOptions } from '../../core/interfaces/client-options.interface';
import { ProfileAPIClient } from './profile-api/profile-api.client';

export class WoWClient extends BattleNetClient {
  readonly profile;

  constructor(options: ClientOptions) {
    super(options);

    this.profile = new ProfileAPIClient(this);
  }
}
