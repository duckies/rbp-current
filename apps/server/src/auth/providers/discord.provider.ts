import { SqlEntityManager } from '@mikro-orm/knex'
import { Injectable } from '@nestjs/common'
import got from 'got-cjs'
import { User } from '../../user/user.entity'
import { TokenDTO } from '../dto/tokens.dto'
import { Identity } from '../identity/identity.entity'
import { DiscordUser } from '../interfaces/discord-user.interface'

@Injectable()
export class DiscordProvider {
  constructor(private readonly em: SqlEntityManager) {}

  async getProfile(accessToken: string) {
    return got.get<DiscordUser>('https://discord.com/api/users/@me', {
      responseType: 'json',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  async handleCallback(tokens: TokenDTO) {
    const { body: profile } = await this.getProfile(tokens.access_token)

    const identity = await this.em.findOne(Identity, [profile.id, 'discord'], {
      populate: ['user.identities'],
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
            expiresAt: new Date(tokens.expires_at),
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
      expiresAt: new Date(tokens.expires_at),
    })

    await this.em.flush()

    return identity.user
  }
}
