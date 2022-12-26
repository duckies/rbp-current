import { type OptionsInit } from 'got-cjs'
import type { AuthOptions } from '../modules/auth/interfaces/auth-options.interface'
import type { RateLimiterOptions } from '../modules/rate-limiter/interfaces/rate-limier-options.interface'

export type HttpModuleType = 'auth' | 'rate' | 'logs'

export type HttpModuleOptionsMap = Partial<
  Record<HttpModuleType, Record<string, any>>
>

export interface HttpModuleOptions extends HttpModuleOptionsMap {
  auth?: AuthOptions
  rate?: RateLimiterOptions
}

export interface HttpOptions extends OptionsInit {
  modules?: HttpModuleOptions
}
