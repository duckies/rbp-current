import { Module } from '@nestjs/common'
import { BotModule } from '../bot/bot.module'
import { WarcraftLogsCommands } from './warcraft-logs.commands'
import { WarcraftLogsController } from './warcraft-logs.controller'
import { WarcraftLogsService } from './warcraft-logs.service'

@Module({
  imports: [BotModule],
  providers: [WarcraftLogsService, WarcraftLogsCommands],
  controllers: [WarcraftLogsController],
  exports: [WarcraftLogsService],
})
export class WarcraftLogsModule {}
