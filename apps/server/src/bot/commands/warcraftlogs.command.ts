import { Injectable } from '@nestjs/common'
import { Command } from '../decorators/command.decorator'
import { Group } from '../decorators/group.decorator'
import { SubGroup } from '../decorators/sub-group.decorator'
import { UseGroups } from '../decorators/use-groups.decorator'

@Injectable()
@Group('wcl', 'WarcraftLogs tools and resources')
@SubGroup('search', 'Search for WarcraftLogs data')
export class WarcraftLogsCommand {
  @UseGroups('wcl')
  @Command('debug', 'Standalone Command Test')
  debug() {}

  @Command('scree', 'Make screeching sounds')
  scree() {}

  @UseGroups('wcl', 'search')
  @Command('character', 'Search for a character')
  character() {}
}
