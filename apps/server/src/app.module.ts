import { Module } from '@nestjs/common';
import { EnvironmentVariables } from './app.config';
import { AuthModule } from './auth/auth.module';
import { BlizzardModule } from './blizzard/blizzard.module';
import { BotModule } from './bot/bot.module';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from './config/config.module';
import { FormFieldModule } from './form-field/form-field.module';
import { FormModule } from './form/form.module';
import { PermissionModule } from './permission/permission.module';
import { RoleModule } from './role/role.module';
import { SlideModule } from './slide/slide.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      schema: EnvironmentVariables,
      envSeparator: '__',
    }),
    DatabaseModule,
    AuthModule,
    BotModule,
    PermissionModule,
    RoleModule,
    SlideModule,
    FormModule,
    FormFieldModule,
    BlizzardModule,
  ],
})
export class AppModule { }
