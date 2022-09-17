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
import { OptionItemDTO } from './create-form-field.dto'

export class UpdateFormFieldDTO implements Prisma.JsonObject {
  @IsEnum(FieldType)
  type!: FieldType

  @IsOptional()
  @IsString()
  label?: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsBoolean()
  required?: boolean

  @IsOptional()
  @IsNumber()
  @Min(1)
  order?: number

  @ValidateIf((o) => [FieldType.Select].includes(o.type))
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => OptionItemDTO)
  options?: OptionItemDTO[] & Prisma.JsonArray

  @ValidateIf((o) => [FieldType.Select].includes(o.type))
  @IsOptional()
  @IsBoolean()
  multiple?: boolean;

  [key: string]: Prisma.JsonValue | undefined
}
