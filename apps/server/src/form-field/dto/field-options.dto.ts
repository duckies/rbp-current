import type { Prisma } from '@prisma/client';
import { IsArray, IsBoolean, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemsDTO {
  @IsString()
  label!: string;

  @IsString()
  value!: string;
}

export class BaseOptionsDTO {
  @IsOptional()
  @IsBoolean()
  required?: boolean;

  // This is a hack to make Prisma happy, however,
  // since we use class-validator it can be ignored.
  // @TODO Disabled temporarily as it breaks type safety.
  // [key: string]: any;
}

export class TextFieldOptionsDTO extends BaseOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiline?: boolean;
}

export class SelectFieldOptionsDTO extends BaseOptionsDTO {
  @IsArray()
  @ValidateNested()
  @Type(() => ItemsDTO)
  items!: ItemsDTO[] & Prisma.JsonArray;

  @IsOptional()
  @IsBoolean()
  multiple?: boolean;
}

export class ComboboxFieldOptionsDTO extends BaseOptionsDTO {
  @IsArray()
  @ValidateNested()
  @Type(() => ItemsDTO)
  items!: ItemsDTO[] & Prisma.JsonArray;

  @IsOptional()
  @IsBoolean()
  multiple?: boolean;
}

export class CharacterFieldOptionsDTO extends BaseOptionsDTO {
  @IsOptional()
  @IsBoolean()
  multiple?: boolean;

  @IsOptional()
  @IsBoolean()
  requireMain?: boolean;
}

export type FieldOptionsDTO = TextFieldOptionsDTO | SelectFieldOptionsDTO | CharacterFieldOptionsDTO | BaseOptionsDTO;
