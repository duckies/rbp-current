import { FieldType } from '@prisma/client';
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
import { BaseOptionsDTO, CharacterFieldOptionsDTO, FieldOptionsDTO, SelectFieldOptionsDTO, TextFieldOptionsDTO } from './field-options.dto';

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
        return TextFieldOptionsDTO;
      case FieldType.Select:
        return SelectFieldOptionsDTO;
      case FieldType.Character:
        return CharacterFieldOptionsDTO;
      default:
        return BaseOptionsDTO;
    }
  })
  options!: FieldOptionsDTO;
}

