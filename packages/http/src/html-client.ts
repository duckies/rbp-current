import type { ExtendOptions, Got, OptionsInit } from 'got-cjs'
import got from 'got-cjs'
import { deepmerge } from '@rbp/shared'
import type {
  HttpModuleOptions,
  HttpModuleType,
  HttpOptions,
} from './interfaces/http-options.interface'
import { AuthHttpModule } from './modules/auth/auth.http-module'
import type { HttpModule } from './modules/base/base.http-module'
import { RateLimiterHttpModule } from './modules/rate-limiter/rate-limiter.http-module'

export class HTTPClient {
  private _modules: Partial<Record<HttpModuleType, HttpModule>> = {}
  private _got: Got

  public readonly post
  public readonly put
  public readonly get;
  public readonly paginate
  public readonly patch
  public readonly delete

  constructor({ modules, ...gotOptions }: HttpOptions = {}) {
    this._got = this.buildInstance(gotOptions, modules)

    this.post = this._got.post.bind(this)
    this.put = this._got.put.bind(this)
    this.get = this._got.get.bind(this)
    this.paginate = this._got.paginate.bind(this)
    this.patch = this._got.patch.bind(this)
    this.delete = this._got.delete.bind(this)
  }

  private buildInstance(optionsInit: OptionsInit, modules?: HttpModuleOptions) {
    let options: ExtendOptions = deepmerge(
      {
        hooks: {
          init: [],
          beforeRequest: [],
          afterResponse: [],
          beforeError: [],
          beforeRedirect: [],
          beforeRetry: [],
        },
        handlers: [],
      },
      optionsInit,
    )

    if (modules?.auth) {
      this._modules.auth = new AuthHttpModule(modules.auth)
      options = deepmerge(options, this._modules.auth.toOptions())
    }

    if (modules?.rate) {
      this._modules.rate = new RateLimiterHttpModule(modules.rate)
      options = deepmerge(options, this._modules.rate.toOptions())
    }

    return got.extend(options)
  }
}
