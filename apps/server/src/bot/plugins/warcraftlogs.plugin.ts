import { Injectable } from '@nestjs/common'
import { Channel, ChannelType, ChatInputCommandInteraction, Message } from 'discord.js'
import { Command, Group, OnEvent, Option, SubGroup, UseGroups } from '../decorators'

const regex = /https:\/\/www\.warcraftlogs\.com\/reports\/([a-zA-Z0-9]+)/

@Injectable()
@Group('wcl', 'WarcraftLogs tools and resources')
@SubGroup('search', 'Search for WarcraftLogs data')
export class WarcraftLogsCommand {
  @UseGroups('wcl')
  @Command('debug', 'Standalone Command Test')
  debug() {}

  @Command('scree', 'Make screeching sounds')
  scree(
    interaction: ChatInputCommandInteraction,
    @Option('sound', 'Sound to screech', { type: 'Channel' }) channel: Channel
  ) {
    console.log({
      interaction,
      channel,
    })

    interaction.reply('I love being on camarah!')
  }

  @UseGroups('wcl', 'search')
  @Command('character', 'Search for a character')
  character() {}

  @OnEvent('messageCreate')
  async onMessageCreate(message: Message) {
    if (
      message.author.bot &&
      message.author.username === 'WarcraftLogs' &&
      message.embeds[0]?.url?.includes('https://www.warcraftlogs.com/reports/')
    ) {
      const url = message.embeds[0].url
      const id = url.match(regex)?.[1]

      const channel = message.guild?.channels.cache.get('291817201055432704')

      if (channel && channel.type === ChannelType.GuildText) {
        channel.send({
          embeds: [
            {
              description: `[WarcraftLogs Report](${url})`,
              fields: [
                {
                  name: 'Tools',
                  value: `[Wipefest](https://www.wipefest.gg/report/${id})`,
                },
              ],
            },
          ],
        })
      }
    }
  }
}
