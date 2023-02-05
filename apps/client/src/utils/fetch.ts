import { isString } from '@rbp/shared';
import config from 'lib/config';

type RequestOptions = RequestInit & { bodyOnly?: boolean };

type OptionsOfUnknownResponseBody = RequestInit & { bodyOnly?: false };
type OptionsOfJSONResponseBody = RequestInit & { bodyOnly: true };

type JSONResponseBodyHelperOptions = Omit<
  OptionsOfJSONResponseBody,
  'method' | 'bodyOnly'
>;

interface FetchFunction {
  (
    url: string | URL,
    options?: OptionsOfUnknownResponseBody,
  ): Promise<Response>
  <T>(url: string | URL, options?: OptionsOfJSONResponseBody): Promise<T>
}

export const $fetch: FetchFunction = async <T>(
  url: string | URL,
  options: RequestOptions = {},
) => {
  if (isString(url) && (url.startsWith('/') || !url.startsWith('http'))) {
    url = new URL(url, config.API_URL).toString();
  }

  const pendingResponse = fetch(url, options);

  if (options.bodyOnly) {
    const response = await pendingResponse;
    const data = await response.json();

    if (!response.ok) {
      throw data;
    }

    return data as T;
  }

  return pendingResponse;
};

export async function $get<T>(
  url: string | URL,
  options: JSONResponseBodyHelperOptions = {},
) {
  return $fetch<T>(url, { ...options, method: 'GET', bodyOnly: true });
}

export function $post<T>(
  url: string | URL,
  options: JSONResponseBodyHelperOptions = {},
) {
  return $fetch<T>(url, { ...options, method: 'POST', bodyOnly: true });
}

export function $patch<T>(
  url: string | URL,
  options: JSONResponseBodyHelperOptions = {},
) {
  return $fetch<T>(url, { ...options, method: 'PATCH', bodyOnly: true });
}

export function $delete<T>(
  url: string,
  options: JSONResponseBodyHelperOptions = {},
) {
  return $fetch<T>(url, { ...options, method: 'DELETE', bodyOnly: true });
}
