import type { OptionsOfJSONResponseBody } from 'got-cjs';
import type { OAuthOptions } from '../interfaces/auth-options.interface';

export class OAuthEnvironment {
  public readonly name: string;
  public readonly clientId: string;
  public readonly clientSecret: string;
  public readonly authorizationUrl: string;

  constructor(
    options: OAuthOptions,
  ) {
    this.name = options.name;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.authorizationUrl = options.authorizationUrl;
  }

  public get Request(): OptionsOfJSONResponseBody {
    return {
      method: 'POST',
      url: this.authorizationUrl,
      form: {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        grant_type: 'client_credentials',
      },
      responseType: 'json',
    };
  }
}
