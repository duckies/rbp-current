import { Injectable } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { EnvironmentVariables } from '../app.config';
import { Provider } from './interfaces/provider.interface';
import { BlizzardProvider } from './providers/blizzard.provider';
import { DiscordProvider } from './providers/discord.provider';

@Injectable()
export class AuthService {
  constructor(
    private config: EnvironmentVariables,
    private discordProvider: DiscordProvider,
    private blizzardProvider: BlizzardProvider,
  ) {}

  handleCallback(provider: Provider, code: string) {
    switch (provider) {
      case 'discord':
        return this.discordProvider.handleCallback(code);
      case 'blizzard':
        return this.blizzardProvider.handleCallback(code);
    }
  }

  signJWT(payload: object) {
    return sign(payload, this.config.JWT_SECRET, {
      expiresIn: '30 days',
    });
  }

  verifyJWT<T = any>(token: string) {
    return verify(token, this.config.JWT_SECRET) as T;
  }
}
