import { Module } from '@nestjs/common'
import { DiscoveryModule } from '@nestjs/core'
import { BotMetadataAccessor } from './bot.accessor'
import { BotExplorer } from './bot.explorer'
import { BotRegistry } from './bot.registry'
import { BotService } from './bot.service'
import { KeysCommand } from './commands/keys.command'
import { WarcraftLogsCommand } from './commands/warcraftlogs.command'
import { WelcomerPlugin } from './commands/welcomer.command'

@Module({
  imports: [DiscoveryModule],
  providers: [
    BotService,
    WarcraftLogsCommand,
    KeysCommand,
    BotMetadataAccessor,
    BotExplorer,
    BotRegistry,
    WelcomerPlugin,
  ],
})
export class BotModule {}
