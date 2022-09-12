import { FieldType } from '@prisma/client'
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator'

export class CreateFormFieldDTO {
  @IsString()
  label!: string

  @IsOptional()
  @IsBoolean()
  required?: boolean

  @IsEnum(FieldType)
  type!: FieldType

  @IsNumber()
  @Min(1)
  order!: number
}
