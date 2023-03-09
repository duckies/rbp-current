import { Type } from 'class-transformer'
import {
  IsDefined,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator'
import { FieldType, FieldTypes } from '../form-field.entity'
import {
  CharacterFieldOptionsDTO,
  FormFieldOptionsDTO,
  SelectFieldOptionsDTO,
  TextFieldOptionsDTO,
} from './field-options.dto'

export class CreateFormFieldDTO {
  @IsString()
  label!: string

  @IsOptional()
  @IsString()
  description?: string

  @IsIn(FieldTypes)
  type!: FieldType

  @IsNumber()
  @Min(1)
  order!: number

  @IsDefined()
  @ValidateNested()
  @Type(({ object }: any) => {
    switch (object.type) {
      case 'text':
        return TextFieldOptionsDTO
      case 'select':
        return SelectFieldOptionsDTO
      case 'character':
        return CharacterFieldOptionsDTO
      default:
        throw new Error(`Unknown or unimplemented field type: ${object.type}`)
    }
  })
  options!: FormFieldOptionsDTO
}
