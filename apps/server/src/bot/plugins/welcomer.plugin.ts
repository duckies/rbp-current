import { Injectable } from '@nestjs/common'
import {
  ChannelType,
  ChatInputCommandInteraction,
  Guild,
  GuildMember,
  TextChannel,
} from 'discord.js'
import { BotService } from '../bot.service'
import { Command, Group, Option, SubGroup, UseGroups } from '../decorators'
import { OnEvent } from '../decorators/event.decorator'
import { StoreService } from '../stores/store.service'

@Injectable()
@SubGroup('settings', 'Welcomer settings.')
@Group('welcomer', 'Greeter for new and leaving server members.')
export class WelcomerPlugin {
  constructor(private readonly bot: BotService, private readonly store: StoreService) {}

  private async getChannel(guild: Guild) {
    const guilds = await this.store.get('welcomer', 'channels')
    const channelId = guilds?.[guild.id]

    if (channelId) {
      const channel = guild.channels.cache.get(channelId)

      if (channel && channel.type === ChannelType.GuildText) {
        return channel
      }
    }
  }

  @UseGroups('welcomer', 'settings')
  @Command('set-channel', 'Sets the channel for greetings.')
  private async setChannel(
    interaction: ChatInputCommandInteraction,
    @Option('channel', 'Channel for greeings', {
      type: 'Channel',
      required: true,
      types: [ChannelType.GuildText],
    })
    channel: TextChannel
  ) {
    await interaction.deferReply({ ephemeral: true })

    await this.store.set('welcomer', 'channels', { [channel.guild.id]: channel.id })

    return interaction.editReply(`Channel set to ${channel}`)
  }

  @OnEvent('guildMemberAdd')
  async onGuildMemberAdd(member: GuildMember) {
    const channel = await this.getChannel(member.guild)

    if (!channel) {
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

  @OnEvent('guildMemberRemove')
  async onGuildMemberRemove(member: GuildMember) {
    const channel = await this.getChannel(member.guild)

    if (!channel) {
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
