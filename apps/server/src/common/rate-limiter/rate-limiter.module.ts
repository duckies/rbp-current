import { DynamicModule, Module, Provider } from '@nestjs/common';
import Queue from 'p-queue';

type Options = ConstructorParameters<typeof Queue>[0];

@Module({})
export class RateLimiterModule {
  public static forFeature(options: Options): DynamicModule {
    const provider: Provider = {
      provide: Queue,
      useValue: new Queue(options),
    };

    return {
      module: RateLimiterModule,
      providers: [provider],
      exports: [provider],
    };
  }
}
