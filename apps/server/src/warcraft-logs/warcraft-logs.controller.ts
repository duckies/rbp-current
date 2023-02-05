import { Controller, Get } from '@nestjs/common'
import { WarcraftLogsService } from './warcraft-logs.service'

@Controller('logs')
export class WarcraftLogsController {
  constructor(private readonly wclService: WarcraftLogsService) {}

  @Get()
  getReports() {
    return this.wclService.getReports({})
  }
}
