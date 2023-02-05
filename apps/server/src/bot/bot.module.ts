import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { BotMetadataAccessor } from './bot.accessor'
import { BotExplorer } from './bot.explorer'
import { BotRegistry } from './bot.registry'
import { BotService } from './bot.service'
import { WelcomerPlugin } from './plugins/welcomer.plugin'

@Module({
  imports: [DiscoveryModule],
  providers: [BotService, BotMetadataAccessor, BotExplorer, BotRegistry, WelcomerPlugin],
  exports: [BotService],
})
export class BotModule {}
