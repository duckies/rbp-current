import { Module, Provider } from '@nestjs/common'
import { WoWClient } from '@rbp/battle.net'
import { BlizzardConfig } from '../app.config'
import { HttpModule } from '../common/http/http.module'
import { RateLimiterModule } from '../common/rate-limiter/rate-limiter.module'
import { WINSTON_INSTANCE } from '../logger/logger.constants'
import { WinstonLogger } from '../logger/logger.service'

const WoWClientProvider: Provider = {
  provide: WoWClient,
  inject: [BlizzardConfig, WINSTON_INSTANCE],
  useFactory: (config: BlizzardConfig, logger: WinstonLogger) => {
    return new WoWClient({
      clientId: config.ID,
      clientSecret: config.SECRET,
      defaults: {
        region: 'us',
        locale: 'en_US',
      },
      clientOptions: {
        hooks: {
          beforeRequest: [
            (options) => {
              logger?.verbose({ message: options.url, options })
            },
          ],
          afterResponse: [
            (response) => {
              logger?.verbose({
                message: response.url,
                statusCode: response.statusCode,
                statusMessage: response.statusMessage,
                body: response.body,
              })
              return response
            },
          ],
        },
      },
    })
  },
}

@Module({
  imports: [
    HttpModule,
    RateLimiterModule.forFeature({
      interval: 1000,
      intervalCap: 100,
      concurrency: 10,
      timeout: 5000,
    }),
  ],
  providers: [WoWClientProvider],
  exports: [WoWClientProvider],
})
export class BlizzardModule {}
