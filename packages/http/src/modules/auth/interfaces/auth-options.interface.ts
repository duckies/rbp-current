/**
 * Just a placeholder for if other auth styles are added in the future,
 * e.g. simple API token.
 */
export type AuthOptions = OAuthOptions;

export interface OAuthOptions {
  type: 'oauth'

  /**
   * Name of the service for diagnostics.
   */
  name: string

  /** OAuth2 client id */
  clientId: string

  /** OAuth2 client secret */
  clientSecret: string

  /** OAuth2 authorization url */
  authorizationUrl: string
}
