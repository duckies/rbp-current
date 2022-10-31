import type { GotReturn, Options } from 'got-cjs';
import Queue from 'p-queue';
import { HttpModule } from '../base/base.http-module';
import type { RateLimiterOptions } from './interfaces/rate-limier-options.interface';

export class RateLimiterHttpModule extends HttpModule {
  private readonly _queue: Queue;

  constructor(options: RateLimiterOptions) {
    super();

    this._queue = new Queue({
      ...options,
      carryoverConcurrencyCount: true,
    });
  }

  public handler<T extends GotReturn>(options: Options, next: (options: Options) => T) {
    return this._queue.add<T>(() => next(options));
  }

  public toOptions() {
    return {
      handlers: [this.handler.bind(this)],
    };
  }
}
