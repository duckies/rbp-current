import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { FieldItemsDTO } from './field-items.dto'

export class BaseUpdateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  required?: boolean
}

export class UpdateTextFieldOptionsDTO extends BaseUpdateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiline?: boolean
}

export class UpdateNumberFieldOptionsDTO extends BaseUpdateOptionsDTO {
  @IsOptional()
  @IsNumber()
  min?: number

  @IsOptional()
  @IsNumber()
  max?: number
}

export class UpdateCheckboxFieldOptionsDTO extends BaseUpdateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  noFalse?: boolean
}

export class UpdateSelectFieldOptionsDTO extends BaseUpdateOptionsDTO {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => FieldItemsDTO)
  items!: FieldItemsDTO[]

  @IsOptional()
  @IsBoolean()
  multiple?: boolean
}

export class UpdateComboboxFieldOptionsDTO extends UpdateSelectFieldOptionsDTO {
  @IsOptional()
  @IsBoolean()
  custom?: boolean
}

export class UpdateRadioFieldOptionsDTO extends BaseUpdateOptionsDTO {
  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => FieldItemsDTO)
  items!: FieldItemsDTO[]
}

export class UpdateCharacterFieldOptionsDTO extends BaseUpdateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiple?: boolean

  @IsOptional()
  @IsBoolean()
  requireMain?: boolean
}

export type UpdateFieldOptionsDTO =
  | UpdateTextFieldOptionsDTO
  | UpdateNumberFieldOptionsDTO
  | UpdateCheckboxFieldOptionsDTO
  | UpdateSelectFieldOptionsDTO
  | UpdateComboboxFieldOptionsDTO
  | UpdateRadioFieldOptionsDTO
  | UpdateCharacterFieldOptionsDTO
  | BaseUpdateOptionsDTO
