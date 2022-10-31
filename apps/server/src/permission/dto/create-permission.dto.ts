import { Model, PrismaQuery } from '@casl/prisma'
import { Action, Permission, Prisma, Subject } from '@prisma/client'
import { IsBoolean, IsIn, IsJSON, IsOptional, IsString } from 'class-validator'
import { Actions, Subjects } from '../../auth/auth.constants'

export type PermissionConditions = PrismaQuery<
  Model<Permission, 'Permission'>
> &
  Prisma.JsonObject

export class CreatePermissionDTO {
  @IsString()
  @IsIn(Subjects)
  subject!: Subject

  @IsString()
  @IsIn(Actions)
  action!: Action

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
