import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ItemsDTO {
  @IsString()
  label!: string;

  @IsString()
  value!: string;
}

export class BaseCreateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  required?: boolean;
}

export class CreateTextFieldOptionsDTO extends BaseCreateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiline?: boolean;
}

export class CreateNumberFieldOptionsDTO extends BaseCreateOptionsDTO {
  @IsOptional()
  @IsNumber()
  min?: number;

  @IsOptional()
  @IsNumber()
  max?: number;
}

export class CreateCheckboxFieldOptionsDTO extends BaseCreateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  noFalse?: boolean;
}

export class CreateSelectFieldOptionsDTO extends BaseCreateOptionsDTO {
  @IsArray()
  @ValidateNested()
  @Type(() => ItemsDTO)
  items!: ItemsDTO[];

  @IsOptional()
  @IsBoolean()
  multiple?: boolean;
}

export class CreateComboboxFieldOptionsDTO extends CreateSelectFieldOptionsDTO {
  @IsOptional()
  @IsBoolean()
  custom?: boolean;
}

export class CreateRadioFieldOptionsDTO extends BaseCreateOptionsDTO {
  @IsArray()
  @ValidateNested()
  @Type(() => ItemsDTO)
  items!: ItemsDTO[];
}

export class CreateCharacterFieldOptionsDTO extends BaseCreateOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiple?: boolean;

  @IsOptional()
  @IsBoolean()
  requireMain?: boolean;
}

export type CreateFieldOptionsDTO =
  | CreateTextFieldOptionsDTO
  | CreateNumberFieldOptionsDTO
  | CreateCheckboxFieldOptionsDTO
  | CreateSelectFieldOptionsDTO
  | CreateComboboxFieldOptionsDTO
  | CreateRadioFieldOptionsDTO
  | CreateCharacterFieldOptionsDTO
  | BaseCreateOptionsDTO;
