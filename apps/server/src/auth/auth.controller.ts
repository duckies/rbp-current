import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Provider } from './interfaces/provider.interface';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('callback/:provider')
  async callback(
    @Param('provider') provider: Provider,
    @Query('code') code: string,
  ) {
    const user = await this.authService.handleCallback(provider, code);

    return {
      token: this.authService.signJWT({ id: user.id }),
      user,
    };
  }
}
