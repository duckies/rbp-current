import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { DatabaseModule } from './common/database/database.module'
import { PermissionModule } from './permission/permission.module'
import { RoleModule } from './role/role.module'
import { SlideModule } from './slide/slide.module'
import { validate } from './app.config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    DatabaseModule,
    AuthModule,
    PermissionModule,
    RoleModule,
    SlideModule,
  ],
})
export class AppModule {}
