import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateRoleDTO {
  @IsString()
  name!: string

  @IsOptional()
  @IsNumber()
  userId?: number
}
