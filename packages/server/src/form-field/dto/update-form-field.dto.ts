import { IsBoolean, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class UpdateFormFieldDTO {
  @IsOptional()
  @IsString()
  label?: string

  @IsOptional()
  @IsBoolean()
  required?: boolean

  @IsOptional()
  @IsNumber()
  @Min(1)
  order?: number
}
