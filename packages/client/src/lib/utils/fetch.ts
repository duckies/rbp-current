import { parseCookies } from 'nookies';
import type { GetServerSidePropsContext } from 'next';
import { isString } from '@rbp/shared';
import config from 'lib/config';

export type RequestOptions = RequestInit & {
  context?: GetServerSidePropsContext
  /**
   * If true, the request will be made with the user's token cookie.
   */
  authenticate?: boolean
};

export type RequestMethodOptions = Omit<RequestOptions, 'method'>;

export async function $fetch<T = unknown>(
  url: URL | string,
  options: RequestOptions = {},
) {
  // TODO: Where do we check if the user is authenticated?
  if (options.authenticate) {
    const { token } = parseCookies(options.context);

    if (token) {
      options.headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
      };
    }
  }

  if (isString(url) && (url.startsWith('/') || !url.startsWith('http'))) {
    url = new URL(url, config.API_URL).toString();
  }

  const response = await fetch(url, options);
  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data as Promise<T>;
}

export function $get<T = unknown>(
  url: string | URL,
  options: RequestMethodOptions = {},
) {
  return $fetch<T>(url, options);
}

export function $post<T = unknown>(
  url: string | URL,
  options: RequestMethodOptions = {},
) {
  return $fetch<T>(url, { ...options, method: 'POST' });
}

export function $patch<T = unknown>(
  url: string | URL,
  options: RequestMethodOptions = {},
) {
  return $fetch<T>(url, { ...options, method: 'PATCH' });
}

export function $delete<T = unknown>(
  url: string,
  options: RequestMethodOptions = {},
) {
  return $fetch<T>(url, { ...options, method: 'DELETE' });
}
