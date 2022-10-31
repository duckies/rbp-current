import { Global, Module } from '@nestjs/common';
import { HttpModule } from '../common/http/http.module';
import { UserModule } from '../user/user.module';
import { AbilityFactory } from './ability-factory.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTGuard } from './guards';
import { PermissionGuard } from './guards/permission.guard';
import { BlizzardProvider } from './providers/blizzard.provider';
import { DiscordProvider } from './providers/discord.provider';

@Global()
@Module({
  imports: [HttpModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    DiscordProvider,
    BlizzardProvider,
    AbilityFactory,
    JWTGuard,
    PermissionGuard,
  ],
  exports: [AuthService, AbilityFactory],
})
export class AuthModule {}
