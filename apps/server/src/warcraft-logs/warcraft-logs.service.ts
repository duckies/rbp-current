import { HttpException, Injectable, NotFoundException } from '@nestjs/common'
import { HTTPClient } from '@rbp/http'
import { Report, ReportIndex, ReportResponse } from './interfaces/report.interface'
import { ZonesResponse } from './interfaces/zones.interface'
import { WarcraftLogsConfig } from './warcraft-logs.config'

@Injectable()
export class WarcraftLogsService {
  private readonly http: HTTPClient
  private readonly zoneCache = new Map()

  constructor(config: WarcraftLogsConfig) {
    this.http = new HTTPClient({
      modules: {
        auth: {
          type: 'oauth',
          name: 'Warcraft Logs',
          authorizationUrl: 'https://www.warcraftlogs.com/oauth/token',
          clientId: config.ID,
          clientSecret: config.SECRET,
        },
      },
      method: 'POST',
      timeout: { request: 5000 },
      responseType: 'json',
      headers: {
        contentType: 'application/json',
      },
    })
  }

  async getReport(code: string) {
    const response = await this.http.post<ReportResponse>({
      url: 'https://www.warcraftlogs.com/api/v2/client',
      json: {
        query: `
        {
          reportData {
            report(code: "${code}") {
              code,
              title,
              startTime,
              endTime,
              fights(killType: Encounters) {
                id,
                encounterID,
                kill,
                name,
                difficulty,
                bossPercentage,
                keystoneBonus,
                keystoneLevel,
                keystoneTime,
              },
              zone {
                id,
                name
              },
              owner {
                name
              }
            }
          }
        }
        `,
      },
      resolveBodyOnly: true,
    })

    if (response.errors) {
      if (response.errors.find((e) => e.message.includes('does not exist'))) {
        throw new NotFoundException('Report not found', code)
      }

      throw new HttpException(response.errors, 500)
    }

    return response.data.reportData.report
  }

  async getReports<T extends { fights: true; limit?: number }>(options: T): Promise<Report[]>
  async getReports<T extends { fights?: false; limit?: number }>(options: T): Promise<ReportIndex[]>
  async getReports({ fights, limit = 5 }: { fights?: boolean; limit?: number } = {}) {
    const response = await this.http.post<any>({
      url: 'https://www.warcraftlogs.com/api/v2/client',
      json: {
        query: `{
        reportData {
          reports (guildName: "Really Bad Players", guildServerSlug: "area-52", guildServerRegion: "us", limit: ${limit}, ) {
            data {
              code,
              title,
              startTime,
              endTime,
              ${
                fights &&
                `fights(killType: Encounters) {
                id,
                encounterID,
                kill,
                name,
                difficulty,
                bossPercentage,
                keystoneBonus,
                keystoneLevel,
                keystoneTime,
              },`
              }
              zone {
                id,
                name,
              }
            },
          }
        }
      }`,
      },
      resolveBodyOnly: true,
    })

    return response.data.reportData.reports.data
  }

  async getZones() {
    const response = await this.http.post<ZonesResponse>({
      url: 'https://www.warcraftlogs.com/api/v2/client',
      cache: this.zoneCache,
      json: {
        query: `{
          worldData {
            expansions {
              id,
              name,
              zones {
                id,
                name,
                encounters {
                  id,
                  name
                },
                difficulties {
                  id,
                  name
                }
              }
            },
          }
        }`,
      },
      resolveBodyOnly: true,
    })

    return response.data.worldData
  }
}
