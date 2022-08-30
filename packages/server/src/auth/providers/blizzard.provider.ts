import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EnvironmentVariables } from '../../app.config'
import { PrismaService } from '../../common/database/prisma.service'
import { HttpService } from '../../common/http/http.service'
import { BlizzardTokenResponse } from '../interfaces/blizzard-token-response.interface'
import { BlizzardUser } from '../interfaces/blizzard-user.interface'

@Injectable()
export class BlizzardProvider {
  constructor(
    private config: ConfigService<EnvironmentVariables, true>,
    private prisma: PrismaService,
    private http: HttpService
  ) {}

  getProfile(accessToken: string, region = 'us') {
    return this.http.$get<BlizzardUser>(
      `https://${region}.battle.net/oauth/userinfo`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
  }

  async authorize(code: string) {
    return this.http.$post<BlizzardTokenResponse>(
      'https://us.battle.net/oauth/token',
      {
        responseType: 'json',
        form: {
          client_id: this.config.get('BLIZZARD_ID'),
          client_secret: this.config.get('BLIZZARD_SECRET'),
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.config.get('BLIZZARD_REDIRECT'),
        },
      }
    )
  }

  async handleCallback(code: string) {
    const tokens = await this.authorize(code)
    const profile = await this.getProfile(tokens.access_token)

    const identity = await this.prisma.identity.update({
      where: {
        id_provider: {
          id: profile.id.toString(),
          provider: 'Blizzard',
        },
      },
      data: {
        id: profile.id.toString(),
        provider: 'Blizzard',
        identifier: profile.battletag,
        accessToken: tokens.access_token,
        expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
      },
      include: {
        user: {
          include: {
            identities: true,
          },
        },
      },
    })

    return identity.user
  }
}
