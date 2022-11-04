import { SqlEntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { BlizzardConfig } from '../../app.config';
import { HttpService } from '../../common/http/http.service';
import { BlizzardTokenResponse } from '../interfaces/blizzard-token-response.interface';
import { BlizzardUser } from '../interfaces/blizzard-user.interface';

@Injectable()
export class BlizzardProvider {
  constructor(
    private config: BlizzardConfig,
    private em: SqlEntityManager,
    private http: HttpService,
  ) { }

  getProfile(accessToken: string, region = 'us') {
    return this.http.$get<BlizzardUser>(
      `https://${region}.battle.net/oauth/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  }

  async authorize(code: string) {
    return this.http.$post<BlizzardTokenResponse>(
      'https://us.battle.net/oauth/token',
      {
        responseType: 'json',
        form: {
          client_id: this.config.ID,
          client_secret: this.config.SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.config.REDIRECT,
        },
      },
    );
  }

  async handleCallback(code: string) {
    const tokens = await this.authorize(code);
    const profile = await this.getProfile(tokens.access_token);

    // How do we connect Battle.net social auth to the Discord user?

    // return identity.user;
    return profile;
  }
}
