import { Module } from '@nestjs/common';
import { HttpModule } from '../common/http/http.module';
import { RateLimiterModule } from '../common/rate-limiter/rate-limiter.module';
import { BlizzardController } from './blizzard.controller';
import { BlizzardService } from './blizzard.service';

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
  providers: [BlizzardService],
  exports: [BlizzardService],
})
export class BlizzardModule { }
