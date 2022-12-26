import { DynamicModule, Global, Module, Provider } from '@nestjs/common'
import { createLogger, Logger } from 'winston'
import { LoggerOptions } from './interfaces/logger-options.interface'
import { WINSTON_INSTANCE } from './logger.constants'
import { WinstonLogger } from './logger.service'

@Global()
@Module({})
export class WinstonModule {
  public static forRoot(optionsOrInstance: LoggerOptions): DynamicModule {
    const providers: Provider[] = [
      {
        provide: WINSTON_INSTANCE,
        useValue: 'log' in optionsOrInstance ? optionsOrInstance : createLogger(optionsOrInstance),
      },
      {
        provide: WinstonLogger,
        useFactory: (logger: Logger) => new WinstonLogger(logger),
        inject: [WINSTON_INSTANCE],
      },
    ]

    return {
      module: WinstonModule,
      providers,
      exports: [...providers],
    }
  }
}
