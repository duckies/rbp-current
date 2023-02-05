import { Body, Controller, Param, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { TokenDTO } from './dto/tokens.dto'
import { Provider } from './identity/identity.entity'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('callback/:provider')
  async callback(@Param('provider') provider: Provider, @Body() tokens: TokenDTO) {
    const user = await this.authService.handleCallback(provider, tokens)

    return {
      token: this.authService.signJWT({ id: user.id }),
      user,
    }
  }
}
