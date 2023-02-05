import { Injectable } from '@nestjs/common'
import { ChannelType, Message } from 'discord.js'
import { Group, OnEvent, SubGroup } from '../decorators'

const regex = /https:\/\/www\.warcraftlogs\.com\/reports\/([a-zA-Z0-9]+)/

@Injectable()
@Group('wcl', 'WarcraftLogs tools and resources')
@SubGroup('search', 'Search for WarcraftLogs data')
export class WarcraftLogsCommand {
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
