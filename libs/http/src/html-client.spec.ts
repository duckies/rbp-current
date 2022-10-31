import { describe, expect, it } from 'vitest';
import { HTTPClient } from './html-client';

describe('HTTPClient', () => {
  it('should load modules', () => {
    // @ts-expect-error - Peeking at the privates.
    expect(Object.keys(new HTTPClient()._modules).length).toBe(0);

    const http = new HTTPClient({
      modules: {
        auth: {
          name: 'Test',
          type: 'oauth',
          authorizationUrl: '',
          clientId: '',
          clientSecret: '',
        },
        rate: {
          interval: 1000,
          intervalCap: 5,
        },
      },
    });

    // @ts-expect-error - Peeking at the privates.
    expect(Object.keys(http._modules).length).toBe(2);
  });
});
