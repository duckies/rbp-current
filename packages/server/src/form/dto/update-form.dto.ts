import { IsBoolean, IsOptional, IsString } from 'class-validator'

export class UpdateFormDTO {
  @IsOptional()
  @IsString()
  title?: string

  @IsOptional()
  @IsBoolean()
  closed?: boolean
}
