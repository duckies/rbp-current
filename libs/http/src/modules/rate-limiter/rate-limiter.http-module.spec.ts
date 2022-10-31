import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { RateLimiterHttpModule } from './rate-limiter.http-module';

describe('RateLimiterModule', () => {
  beforeAll(() => {
    // vi.useFakeTimers({ shouldAdvanceTime: false });
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  describe('handler', () => {
    it('should rate limit requests', async () => {
      const module = new RateLimiterHttpModule({
        interval: 100,
        intervalCap: 1,
      });

      const mock = vi.fn(() => new Promise(resolve => setTimeout(resolve, 100)));

      for (let i = 0; i < 5; i++) {
        module.handler(null as never, mock as never);
      }

      // Autostart will invoke the first "request" immediately.
      expect(mock).toHaveBeenCalledTimes(1);

      for (let i = 0; i < 4; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        expect(mock).toHaveBeenCalledTimes(i + 2);
      }
    });
  });
});
