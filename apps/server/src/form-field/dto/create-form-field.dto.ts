import { Type } from 'class-transformer';
import {
  IsDefined, IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { FieldType, FieldTypes } from '../form-field.entity';
import { CreateCharacterFieldOptionsDTO, CreateFieldOptionsDTO, CreateSelectFieldOptionsDTO, CreateTextFieldOptionsDTO } from './create-field-options.dto';

export class CreateFormFieldDTO {
  @IsString()
  label!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(FieldTypes)
  type!: FieldType;

  @IsNumber()
  @Min(1)
  order!: number;

  @IsDefined()
  @ValidateNested()
  @Type(({ object }: any) => {
    switch (object.type) {
      case 'text':
        return CreateTextFieldOptionsDTO;
      case 'select':
        return CreateSelectFieldOptionsDTO;
      case 'character':
        return CreateCharacterFieldOptionsDTO;
      default:
        throw new Error(`Unknown field type: ${object.type}`);
    }
  })
  options!: CreateFieldOptionsDTO;
}

