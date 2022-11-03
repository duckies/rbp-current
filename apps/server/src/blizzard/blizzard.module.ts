import { Module, Provider } from '@nestjs/common';
import { WoWClient } from '@rbp/battle.net';
import { HttpModule } from '../common/http/http.module';
import { RateLimiterModule } from '../common/rate-limiter/rate-limiter.module';
import { BlizzardController } from './blizzard.controller';
import { BlizzardService } from './blizzard.service';

const clientProvider: Provider = {
  provide: WoWClient,
  useValue: new WoWClient({
    clientId: process.env.BLIZZARD__ID!,
    clientSecret: process.env.BLIZZARD__SECRET!,
    defaults: {
      region: 'us',
      locale: 'en_US',
    },
  }),
};

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
  controllers: [BlizzardController],
  providers: [BlizzardService, clientProvider],
  exports: [BlizzardService, clientProvider],
})
export class BlizzardModule { }
