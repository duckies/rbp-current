import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { BotMetadataAccessor } from './bot.accessor';
import { BotExplorer } from './bot.explorer';
import { BotRegistry } from './bot.registry';
import { BotService } from './bot.service';
import { KeysCommand } from './commands/keys.command';
import { WarcraftLogsCommand } from './commands/warcraftlogs.command';

@Module({
  imports: [DiscoveryModule],
  providers: [
    BotService,
    WarcraftLogsCommand,
    KeysCommand,
    BotMetadataAccessor,
    BotExplorer,
    BotRegistry,
  ],
})
export class BotModule {}
