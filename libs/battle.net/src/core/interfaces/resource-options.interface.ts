import type { Locale, Region } from '../regions';

export type Namespace = 'static' | 'dynamic' | 'profile';

export interface AdvancedOptions {
  region?: Region
  locale?: Locale
  ifModifiedSince?: Date
}

export interface Resource<T = never> {
  path: string
  namespace?: Namespace
  params?: T
  advanced?: AdvancedOptions
}
