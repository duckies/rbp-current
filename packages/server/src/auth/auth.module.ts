import { Global, Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { AbilityFactory } from './ability-factory.service'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JWTGuard } from './guards'
import { PermissionGuard } from './guards/permission.guard'
import { DiscordProvider } from './providers/discord.provider'

@Global()
@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    DiscordProvider,
    AbilityFactory,
    JWTGuard,
    PermissionGuard,
  ],
  exports: [AuthService, AbilityFactory],
})
export class AuthModule {}
