import type {
  ExtendOptions,
  GotReturn,
  Options,
} from 'got-cjs';

export type OptionsReturn = Pick<ExtendOptions, 'hooks' | 'handlers'>;

export abstract class HttpModule {
  protected handler?<T extends GotReturn>(
    options: Options,
    next: (options: Options) => T
  ): T | Promise<T>;

  protected beforeRequest?(options: Options): void | Promise<void>;

  public abstract toOptions(): OptionsReturn;
}
