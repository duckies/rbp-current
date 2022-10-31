import { Injectable } from '@nestjs/common';
import Got, { OptionsOfJSONResponseBody } from 'got-cjs';

@Injectable()
export class HttpService {
  private readonly _got = Got.extend({
    responseType: 'json',
  });

  async $get<T>(url: string | URL, options?: OptionsOfJSONResponseBody) {
    const { body } = await this._got.get<T>(url, options);

    return body;
  }

  async $post<T>(url: string | URL, options?: OptionsOfJSONResponseBody) {
    const { body } = await this._got.post<T>(url, options);

    return body;
  }
}
