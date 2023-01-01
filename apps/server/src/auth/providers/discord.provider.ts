import { SqlEntityManager } from '@mikro-orm/knex'
import { Injectable } from '@nestjs/common'
import got from 'got-cjs'
import { DiscordConfig } from '../../app.config'
import { User } from '../../user/user.entity'
import { Identity } from '../identity/identity.entity'
import { DiscordTokenResponse } from '../interfaces/discord-token-response.interface'
import { DiscordUser } from '../interfaces/discord-user.interface'

@Injectable()
export class DiscordProvider {
  constructor(private readonly config: DiscordConfig, private readonly em: SqlEntityManager) {}

  async getProfile(accessToken: string) {
    return got.get<DiscordUser>('https://discord.com/api/users/@me', {
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  async authorize(code: string) {
    return got.post<DiscordTokenResponse>('https://discord.com/api/v10/oauth2/token', {
      responseType: 'json',
      form: {
        client_id: this.config.ID,
        client_secret: this.config.SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.config.REDIRECT,
      },
    })
  }

  async handleCallback(code: string) {
    const { body: tokens } = await this.authorize(code)
    const { body: profile } = await this.getProfile(tokens.access_token)

    const identity = await this.em.findOne(Identity, [profile.id, 'discord'], {
      populate: ['user'],
    })

    if (!identity) {
      const user = this.em.create(User, {
        identities: [
          {
            provider: 'discord',
            id: profile.id,
            identifier: `${profile.username}#${profile.discriminator}`,
            avatar: profile.avatar,
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
          },
        ],
      })

      await this.em.persist(user).flush()

      return user
    }

    this.em.assign(identity, {
      id: profile.id,
      identifier: `${profile.username}#${profile.discriminator}`,
      avatar: profile.avatar,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      expiresAt: new Date(Date.now() + tokens.expires_in * 1000),
    })

    await this.em.flush()

    return identity.user
  }
}
