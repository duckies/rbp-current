import { Action, Subject } from '@prisma/client'
import { IsBoolean, IsIn, IsJSON, IsOptional, IsString } from 'class-validator'
import { Actions, Subjects } from '../../auth/auth.constants'
import { PermissionConditions } from './create-permission.dto'

export class UpdatePermissionDTO {
  @IsOptional()
  @IsString()
  @IsIn(Subjects)
  subject?: Subject

  @IsOptional()
  @IsString()
  @IsIn(Actions)
  action?: Action

  @IsOptional()
  @IsBoolean()
  inverted?: boolean

  @IsOptional()
  @IsString()
  reason?: string

  @IsOptional()
  @IsJSON()
  conditions?: PermissionConditions

  @IsOptional()
  @IsString()
  roleName?: string
}
