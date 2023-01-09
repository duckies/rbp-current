import { Injectable } from '@nestjs/common'
import { ChannelType, GuildMember } from 'discord.js'
import { BotService } from '../bot.service'
import { Event } from '../decorators/event.decorator'

export interface WelcomerConfigSchema {
  lastMessage: string
}

@Injectable()
export class WelcomerPlugin {
  constructor(
    private readonly bot: BotService
  ) // private readonly config: ConfigService<WelcomerConfigSchema, 'lastMessage'>
  {}

  @Event('guildMemberAdd')
  async onGuildMemberAdd(member: GuildMember) {
    const channel = member.guild.channels.cache.get('142372929961721856')

    if (!channel || channel.type !== ChannelType.GuildText) {
      console.warn('No message channel found.')
      return
    }

    await channel.send({
      embeds: [
        {
          description: `Welcome ${member} to Really Bad Players`,
        },
      ],
    })

    // const lastMessageId = await this.config.get('lastMessage')

    // if (lastMessageId?.value) {
    //   await channel.messages.cache.get(lastMessageId.value)?.delete()
    // }

    // await this.config.set('lastMessage', message.id)
  }

  @Event('guildMemberRemove')
  async onGuildMemberRemove(member: GuildMember) {
    const channel = member.guild.channels.cache.get('142372929961721856')

    if (!channel || channel.type !== ChannelType.GuildText) {
      console.warn('No message channel found.')
      return
    }

    await channel.send({
      embeds: [
        {
          description: `Goodbye ${member}, we will miss you.`,
        },
      ],
    })
  }
}
