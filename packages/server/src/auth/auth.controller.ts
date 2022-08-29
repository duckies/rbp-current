import { Controller, Get, Param, Query } from '@nestjs/common'
import { AuthService } from './auth.service'
import { DiscordProvider } from './providers/discord.provider'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly discordProvider: DiscordProvider,
  ) { }

  @Get(':provider')
  async callback(
    @Param('provider') provider: 'Discord',
    @Query('code') code: string,
  ) {
    const user = await this.discordProvider.handleCallback(code)

    return {
      token: this.authService.signJWT({ id: user.id }),
      user,
    }
  }
}
