import type { Locale, Region } from '../regions';

export interface ClientDefaults {
  /**
     * Default region to use for requests.
     */
  region: Region

  /**
      * Default locale to use for requests.
      *
      * If not provided, the API will return all locales for the region.
      */
  locale?: Locale
}

export interface ClientOptions {
  /**
   * Battle.net API client id.
   */
  clientId: string

  /**
   * Battle.net API client secret.
   */
  clientSecret: string

  /**
   * Default properties of the API.
   * Can be overriden on a per-request basis.
   */
  defaults: ClientDefaults
}
