import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { FieldType } from '../form-field.entity';
import { CreateCharacterFieldOptionsDTO, CreateFieldOptionsDTO, CreateSelectFieldOptionsDTO, CreateTextFieldOptionsDTO } from './create-field-options.dto';

export class CreateFormFieldDTO {
  @IsString()
  label!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(FieldType)
  type!: FieldType;

  @IsNumber()
  @Min(1)
  order!: number;

  @IsDefined()
  @ValidateNested()
  @Type(({ object }: any) => {
    switch (object.type) {
      case FieldType.Text:
        return CreateTextFieldOptionsDTO;
      case FieldType.Select:
        return CreateSelectFieldOptionsDTO;
      case FieldType.Character:
        return CreateCharacterFieldOptionsDTO;
      default:
        throw new Error(`Unknown field type: ${object.type}`);
    }
  })
  options!: CreateFieldOptionsDTO;
}

