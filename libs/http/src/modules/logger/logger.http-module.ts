import type { Options, Response } from 'got-cjs';
import type { LoggerOptions as PinoLoggerOptions } from 'pino';
import pino from 'pino';
import { HttpModule } from '../base/base.http-module';

export type LoggerOptions = PinoLoggerOptions;

export class LoggerHttpModule extends HttpModule {
  private readonly _pino;

  constructor(options: LoggerOptions) {
    super();
    this._pino = pino(options);
  }

  public beforeRequest(options: Options) {
    this._pino.info({ url: options.url, method: options.method });
  }

  public afterResponse(response: Response<any>) {
    this._pino.info({
      url: response.request.options.url,
      method: response.request.options.method,
      statusCode: response.statusCode,
      data: response.body || {},
    });

    return response;
  }

  public toOptions() {
    return {
      hooks: {
        beforeRequest: [this.beforeRequest.bind(this)],
        afterResponse: [this.afterResponse.bind(this)],
      },
    };
  }
}
