import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import got from 'got-cjs'
import { DiscordConfig } from '../../app.config'
import { PrismaService } from '../../common/database/prisma.service'
import { DiscordTokenResponse } from '../interfaces/discord-token-response.interface'
import { DiscordUser } from '../interfaces/discord-user.interface'

@Injectable()
export class DiscordProvider {
  constructor(
    private readonly config: DiscordConfig,
    private readonly prisma: PrismaService
  ) {}

  async getProfile(accessToken: string) {
    return got.get<DiscordUser>('https://discord.com/api/users/@me', {
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  async authorize(code: string) {
    return got.post<DiscordTokenResponse>(
      'https://discord.com/api/v10/oauth2/token',
      {
        responseType: 'json',
        form: {
          client_id: this.config.ID,
          client_secret: this.config.SECRET,
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.config.REDIRECT,
        },
      }
    )
  }

  async handleCallback(code: string) {
    const { body: tokens } = await this.authorize(code)
    const { body: profile } = await this.getProfile(tokens.access_token)

    const properties: Omit<Prisma.IdentityCreateInput, 'user'> = {
      id: profile.id,
      provider: 'Discord',
      identifier: `${profile.username}#${profile.discriminator}`,
      avatar: profile.avatar,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    }

    const identity = await this.prisma.identity.upsert({
      where: {
        id_provider: {
          id: profile.id,
          provider: 'Discord',
        },
      },
      create: {
        ...properties,
        user: {
          create: {},
        },
      },
      update: {
        ...properties,
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
