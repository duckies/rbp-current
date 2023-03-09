import { Type } from 'class-transformer'
import { IsArray, IsBoolean, IsNumber, IsOptional, ValidateNested } from 'class-validator'
import { FieldItemsDTO } from './field-items.dto'

export class BaseOptionsDTO {
  @IsOptional()
  @IsBoolean()
  required?: boolean
}

export class TextFieldOptionsDTO extends BaseOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiline?: boolean
}

export class NumberFieldOptionsDTO extends BaseOptionsDTO {
  @IsOptional()
  @IsNumber()
  min?: number

  @IsOptional()
  @IsNumber()
  max?: number
}

export class CheckboxFieldOptionsDTO extends BaseOptionsDTO {
  @IsOptional()
  @IsBoolean()
  noFalse?: boolean
}

export class SelectFieldOptionsDTO extends BaseOptionsDTO {
  @IsArray()
  @ValidateNested()
  @Type(() => FieldItemsDTO)
  items!: FieldItemsDTO[]

  @IsOptional()
  @IsBoolean()
  multiple?: boolean
}

export class ComboboxFieldOptionsDTO extends SelectFieldOptionsDTO {
  @IsOptional()
  @IsBoolean()
  custom?: boolean
}

export class RadioFieldOptionsDTO extends BaseOptionsDTO {
  @IsArray()
  @ValidateNested()
  @Type(() => FieldItemsDTO)
  items!: FieldItemsDTO[]
}

export class CharacterFieldOptionsDTO extends BaseOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiple?: boolean

  @IsOptional()
  @IsBoolean()
  requireMain?: boolean
}

export interface FormFieldOptionsMap {
  text: TextFieldOptionsDTO
  number: NumberFieldOptionsDTO
  checkbox: CheckboxFieldOptionsDTO
  select: SelectFieldOptionsDTO
  combobox: ComboboxFieldOptionsDTO
  radio: RadioFieldOptionsDTO
  character: CharacterFieldOptionsDTO
}

export type FormFieldOptionsDTO =
  | TextFieldOptionsDTO
  | NumberFieldOptionsDTO
  | CheckboxFieldOptionsDTO
  | SelectFieldOptionsDTO
  | ComboboxFieldOptionsDTO
  | RadioFieldOptionsDTO
  | CharacterFieldOptionsDTO
  | BaseOptionsDTO
