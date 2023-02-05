import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { sign, verify } from 'jsonwebtoken'
import { EnvironmentVariables } from '../app.config'
import { TokenDTO } from './dto/tokens.dto'
import { Provider } from './identity/identity.entity'
import { DiscordProvider } from './providers/discord.provider'

@Injectable()
export class AuthService {
  constructor(private config: EnvironmentVariables, private discordProvider: DiscordProvider) {}

  handleCallback(provider: Provider, tokens: TokenDTO) {
    switch (provider) {
      case 'discord':
        return this.discordProvider.handleCallback(tokens)
      case 'battle.net':
        throw new InternalServerErrorException('Unimplemented')
    }
  }

  signJWT(payload: object) {
    return sign(payload, this.config.JWT_SECRET, {
      expiresIn: '30 days',
    })
  }

  verifyJWT<T = any>(token: string) {
    return verify(token, this.config.JWT_SECRET) as T
  }
}
