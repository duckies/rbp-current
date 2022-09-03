import { ChatInputCommandInteraction } from 'discord.js'
import { Command } from '../decorators/command.decorator'
import { Group } from '../decorators/group.decorator'
import { UseGroups } from '../decorators/use-groups.decorator'

@Group('keys', 'Keystones and things')
export class KeysCommand {
  @UseGroups('keys')
  @Command('list', 'Lists guild keystones')
  list(interaction: ChatInputCommandInteraction) {
    interaction.reply('I do not have any key data hahahahah xD')
  }
}
