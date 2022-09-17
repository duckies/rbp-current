import { FieldType, Prisma } from '@prisma/client'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator'

export class OptionItemDTO {
  @IsString()
  label!: string

  @IsString()
  value!: string
}

export class CreateFormFieldBaseDTO implements Prisma.JsonObject {
  @IsString()
  label!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsBoolean()
  required?: boolean

  @IsEnum(FieldType)
  type!: FieldType

  @IsNumber()
  @Min(1)
  order!: number

  @ValidateIf((o) => [FieldType.Select].includes(o.type))
  @IsArray()
  @ValidateNested()
  @Type(() => OptionItemDTO)
  options!: OptionItemDTO[] & Prisma.JsonArray

  @ValidateIf((o) => [FieldType.Select].includes(o.type))
  @IsOptional()
  @IsBoolean()
  multiple?: boolean;

  [key: string]: Prisma.JsonValue | undefined
}
