import { Module } from '@nestjs/common'
import { EnvironmentVariables } from './app.config'
import { AuthModule } from './auth/auth.module'
import { BotModule } from './bot/bot.module'
import { DatabaseModule } from './common/database/database.module'
import { ConfigModule } from './config/config.module'
import { FormFieldModule } from './form-field/form-field.module'
import { PermissionModule } from './permission/permission.module'
import { RoleModule } from './role/role.module'
import { SlideModule } from './slide/slide.module'

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    //   validate,
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      schema: EnvironmentVariables,
      envSeparator: '__',
    }),
    DatabaseModule,
    AuthModule,
    BotModule,
    PermissionModule,
    RoleModule,
    SlideModule,
    FormFieldModule,
  ],
})
export class AppModule {}
