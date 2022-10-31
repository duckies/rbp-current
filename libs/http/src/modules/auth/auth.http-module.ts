import type { Options } from 'got-cjs';
import got from 'got-cjs';
import { HttpModule } from '../base/base.http-module';
import { AuthToken } from './auth.token';
import { OAuthEnvironment } from './environments/oauth.environment';
import { type AuthOptions } from './interfaces/auth-options.interface';
import type { ClientCredentialResponse } from './interfaces/client-credential-response.interface';
import type { Environment } from './interfaces/environment.interface';

export class AuthHttpModule extends HttpModule {
  private authenticating?: Promise<void> | null = null;
  private readonly environment: Environment;
  private token: AuthToken | null = null;

  constructor(options: AuthOptions) {
    super();

    switch (options.type) {
      case 'oauth':
        this.environment = new OAuthEnvironment(options);
    }
  }

  private async authenticate() {
    console.log('Authenticating');
    try {
      // Using the default got instance can lead to a scenario
      // where the authorization request gets 429'd. A naive solution
      // through using the internal instance would lead to an infinite loop
      // of authorization requests.
      // ...
      // 🤔 Custom options could be passed to configure module runtimes.
      const response = await got<ClientCredentialResponse>(
        this.environment.Request,
      );

      this.token = AuthToken.fromResponse(response.body);
    }
    catch (error) {
      this.token = null;

      throw error;
    }
    finally {
      this.authenticating = null;
    }
  }

  // TODO: Refresh the token if it's close to expiring.
  // public async afterResponse(options: Options) {
  // }

  public async beforeRequest(options: Options) {
    // We are unauthenticated.
    if (!this.token || this.token.isExpired) {
      // There isn't a pending authentication request.
      if (!this.authenticating) {
        this.authenticating = this.authenticate();
      }

      // Funnell all authentication requests to this single pending request.
      await this.authenticating;
    }

    // Otherwise, we are authenticated as far as we know.
    options.headers.authorization = this.token!.AuthorizationString;
  }

  public toOptions() {
    return {
      hooks: {
        beforeRequest: [this.beforeRequest.bind(this)],
      },
    };
  }
}
