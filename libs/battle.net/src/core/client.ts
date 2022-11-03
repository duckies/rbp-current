import type { CancelableRequest, Response } from '@rbp/http';
import { HTTPClient } from '@rbp/http';
import type {
  ClientDefaults,
  ClientOptions,
} from './interfaces/client-options.interface';
import type { ResourceRequest } from './interfaces/resource-options.interface';
import type { Locale } from './regions';
import { RegionalLocalesMap } from './regions';

export abstract class BattleNetClient {
  private readonly http: HTTPClient;

  public readonly defaults: ClientDefaults;

  constructor(options: ClientOptions) {
    this.validateOptions(options);

    this.defaults = {
      ...options.defaults,
    };

    this.http = new HTTPClient({
      timeout: {
        request: 5000,
      },
      modules: {
        rate: {
          interval: 1000,
          intervalCap: 100,
          concurrency: 10,
        },
        auth: {
          type: 'oauth',
          name: 'Battle.net',
          clientId: options.clientId,
          clientSecret: options.clientSecret,
          authorizationUrl: `https://${this.defaults.region}.battle.net/oauth/token`,
        },
        logs: {
          transport: {
            target: 'pino-pretty',
          },
        },
      },
    });
  }

  private validateOptions(options: ClientOptions) {
    const { region, locale } = options.defaults;

    const regionalLocales = RegionalLocalesMap[region].available;

    if (locale && !regionalLocales.includes(locale)) {
      throw new Error(`Invalid locale '${locale}' for region '${region}'.`);
    }
  }

  private getRegionLocaleOrDefault(locale?: Locale) {
    const region = this.defaults.region;

    if (!locale) {
      return RegionalLocalesMap[region].default;
    }
    else if (RegionalLocalesMap[region].available.includes(locale)) {
      return locale;
    }
    else {
      throw new Error(`Invalid locale '${locale}' for region '${region}'.`);
    }
  }

  public get<T = unknown>({ path, namespace, params, ...options }: ResourceRequest): CancelableRequest<Response<T>> {
    const region = options.advanced?.region || this.defaults.region;
    const locale = this.getRegionLocaleOrDefault(options.advanced?.locale);

    return this.http.get<T>({
      url: `https://${region}.api.blizzard.com/${path}`,
      headers: {
        ...(namespace ? { 'Battlenet-Namespace': `${namespace}-${region}` } : {}),
        ...(options.advanced?.ifModifiedSince
          ? { 'If-Modified-Since': options.advanced.ifModifiedSince.toUTCString() }
          : {}),
      },
      searchParams: {
        ...(params || {}),
        locale,
      },
      responseType: 'json',
    });
  }
}
