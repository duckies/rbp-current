import { Injectable, NotFoundException } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { APIEmbed, ChannelType, CommandInteraction, Message } from 'discord.js'
import { BotService } from '../bot/bot.service'
import { Command, Group, OnEvent, Option, UseGroups } from '../bot/decorators'
import { ConfigService } from '../config/config.service'
import { Fight, Report } from './interfaces/report.interface'
import { Difficulty, Expansion, Zone } from './interfaces/zones.interface'
import { WarcraftLogsService } from './warcraft-logs.service'

const regex = /https:\/\/www\.warcraftlogs\.com\/reports\/([a-zA-Z0-9]+)/

interface WarcraftLogsConfig {
  monitoring: Record<string, string>
}

@Injectable()
@Group('logs', 'WarcraftLogs tools and resources')
export class WarcraftLogsCommands {
  constructor(
    private readonly wclService: WarcraftLogsService,
    private readonly config: ConfigService<WarcraftLogsConfig>,
    private readonly bot: BotService
  ) {}

  @UseGroups('logs')
  @Command('latest', 'Fetch the latest WarcraftLogs guild report(s)')
  async getLatest(
    interaction: CommandInteraction,
    @Option('limit', 'The number of reports to fetch', { type: 'Integer' }) limit = 1
  ) {
    await interaction.deferReply({ ephemeral: true })

    const report = await this.wclService.getReport('3AvqtNJYWrVHPkCd')

    const embed = await this.buildReportEmbed(report)

    await interaction.editReply({ embeds: [embed] })
    // const reports = await this.wclService.getReports({ limit: 1 })
    // const single = limit === 1
    // const embeds: APIEmbed[] = []

    // for (const report of reports.data.reportData.reports.data) {
    //   embeds.push({
    //     title: single ? 'Latest WarcraftLogs Report' : `Last ${limit} WarcraftLogs Reports`,
    //     url: single ? `https://www.warcraftlogs.com/reports/${report.code}` : undefined,
    //     description: report.title,
    //   })
    // }

    // return interaction.editReply({ embeds })
  }

  private getFightMetadata(fight: Fight, expansions: Expansion[]) {
    for (const expansion of expansions) {
      for (const zone of expansion.zones) {
        for (const encounter of zone.encounters) {
          if (encounter.id === fight.encounterID) {
            return {
              expansion,
              zone,
              encounter,
              difficulty: zone.difficulties.find((d) => d.id === fight.difficulty)!,
            }
          }
        }
      }
    }
  }

  paginate(strings: string[], maxLength = 1024, delimiter = '\n') {
    const pages: string[] = []
    let currentStr = ''

    for (const str of strings) {
      if (currentStr.length + delimiter.length + str.length > maxLength) {
        pages.push(currentStr)
        currentStr = ''
      }

      currentStr += str + delimiter
    }

    if (currentStr.length > 0) {
      pages.push(currentStr.slice(0, -1))
    }

    return pages
  }

  private async buildReportEmbed(report: Report): Promise<APIEmbed> {
    const zones = await this.wclService.getZones()

    const zoneSegments: Array<{
      fights: Array<Fight & { killed?: boolean; attempts: number; best?: number }>
      zone?: Zone
      difficulty: Difficulty
    }> = []

    for (let i = 0, j = 0; i < report.fights.length; i++) {
      const metadata = this.getFightMetadata(report.fights[i], zones.expansions)

      if (!metadata) continue

      if (!zoneSegments[j]) {
        zoneSegments[j] = {
          fights: [{ ...report.fights[i], attempts: 1, killed: report.fights[i].kill }],
          zone: metadata.zone,
          difficulty: metadata.difficulty,
        }
      } else if (
        zoneSegments[j].zone?.id !== metadata.zone.id ||
        zoneSegments[j].difficulty.id !== metadata.difficulty.id
      ) {
        zoneSegments[++j] = {
          fights: [{ ...report.fights[i], attempts: 1, killed: report.fights[i].kill }],
          zone: metadata.zone,
          difficulty: metadata.difficulty,
        }
      } else {
        const existingEncounter = zoneSegments[j].fights.find(
          (f) => f.encounterID === report.fights[i].encounterID
        )

        if (existingEncounter) {
          existingEncounter.attempts++
          existingEncounter.best = Math.min(
            existingEncounter.best ?? 100,
            report.fights[i].bossPercentage
          )
          existingEncounter.killed = existingEncounter.killed || report.fights[i].kill
        } else {
          zoneSegments[j].fights.push({
            ...report.fights[i],
            attempts: 1,
            killed: report.fights[i].kill,
          })
        }
      }
    }

    const segments = zoneSegments.map((segment) => ({
      name: `${segment.difficulty.name} ${segment.zone?.name || 'No Zone'}`,
      segments: this.paginate(
        segment.fights.map(
          (f) =>
            `:crossed_swords: [${f.name}](https://www.warcraftlogs.com/reports/${report.code}${
              f.killed ? `#fight=${f.id}` : '#fight=latest'
            }) ${
              f.killed
                ? f.attempts === 1
                  ? `one-shot.`
                  : `killed in ${f.attempts} attempts.`
                : `attempted ${f.attempts === 1 ? 'once' : `${f.attempts} times`}.`
            }`
        )
      ),
    }))

    return {
      title: 'Really Bad WarcraftLogs',
      url: `https://www.warcraftlogs.com/reports/${report.code}`,
      description: `*${report.title}*`,
      thumbnail: report.zone
        ? {
            url: `https://assets.rpglogs.com/img/warcraft/zones/zone-${report.zone.id}.png`,
            height: 200,
            width: 200,
          }
        : undefined,
      timestamp: new Date(report.endTime).toISOString(),
      fields: [
        ...segments.flatMap((s) =>
          s.segments.map((v, i) => ({
            name: `${s.name} ${s.segments.length > 1 ? `(${i + 1}/${segments.length})` : ''}`,
            value: v,
          }))
        ),
      ],
    }
  }

  @OnEvent('messageCreate')
  async onMessageCreate(message: Message) {
    if (
      message.author.bot &&
      message.author.username === 'WarcraftLogs' &&
      message.embeds[0]?.url?.includes('https://www.warcraftlogs.com/reports/')
    ) {
      const url = message.embeds[0].url
      const id = url.match(regex)?.[1] as string

      const report = await this.wclService.getReport(id)
      const embed = await this.buildReportEmbed(report)
      const channel = message.guild?.channels.cache.get('291817201055432704')

      if (channel && channel.type === ChannelType.GuildText) {
        const embedMessage = await channel.send({ embeds: [embed] })

        const monitoring = (await this.config.get('monitoring')) || {}
        await this.config.set('monitoring', { ...monitoring, [id]: embedMessage.id })
      }
    }
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async scan() {
    const monitoring = await this.config.get('monitoring')

    if (!monitoring || !Object.keys(monitoring).length) {
      console.log(monitoring)
      return
    }

    const channel = this.bot.channels.cache.get(`291817201055432704`)

    if (!channel || channel.type !== ChannelType.GuildText) return

    for (const [id, messageId] of Object.entries(monitoring)) {
      try {
        const report = await this.wclService.getReport(id)
        const embed = await this.buildReportEmbed(report)

        // If last updated an hour ago, it's stale.
        if (new Date(report.endTime).getTime() < new Date().getTime() - 1000 * 60 * 60) {
          delete monitoring[id]
          embed.footer = {
            text: 'Monitoring Ended',
          }
        } else {
          embed.footer = {
            text: 'Monitoring Log',
          }
        }

        const message = await channel.messages.fetch(messageId)
        await message.edit({ embeds: [embed] })
      } catch (error) {
        if (error instanceof NotFoundException) {
          delete monitoring[id]
        }
      }
    }

    await this.config.set('monitoring', monitoring)
  }
}
