import type { ClientCredentialResponse } from './interfaces/client-credential-response.interface';

export class AuthToken {
  constructor(
    private readonly accessToken: string,
    private readonly tokenType: string,
    private readonly expiresAt: Date,
  ) { }

  public static fromResponse(response: ClientCredentialResponse) {
    return new AuthToken(
      response.access_token,
      response.token_type,
      new Date(Date.now() + response.expires_in * 1000),
    );
  }

  public get isExpired() {
    return this.expiresAt < new Date();
  }

  public get AuthorizationString() {
    return `${this.tokenType} ${this.accessToken}`;
  }
}
