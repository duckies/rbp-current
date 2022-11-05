import { Type } from 'class-transformer';
import {
  IsDefined, IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Min, ValidateNested,
} from 'class-validator';
import { FieldType, FieldTypes } from '../form-field.entity';
import { UpdateCharacterFieldOptionsDTO, UpdateCheckboxFieldOptionsDTO, UpdateComboboxFieldOptionsDTO, UpdateFieldOptionsDTO, UpdateNumberFieldOptionsDTO, UpdateRadioFieldOptionsDTO, UpdateSelectFieldOptionsDTO, UpdateTextFieldOptionsDTO } from './update-field-options.dto';

export class UpdateFormFieldDTO {
  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsString()
  description?: string;

  /**
   * This is **not** mutable, but is required
   * because I'm not some TypeScript wizard.
   */
  @IsIn(FieldTypes)
  type!: FieldType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  order?: number;

  @IsDefined()
  @ValidateNested()
  @Type(({ object }: any) => {
    switch (object.type) {
      case 'text':
        return UpdateTextFieldOptionsDTO;
      case 'select':
        return UpdateSelectFieldOptionsDTO;
      case 'number':
        return UpdateNumberFieldOptionsDTO;
      case 'character':
        return UpdateCharacterFieldOptionsDTO;
      case 'checkbox':
        return UpdateCheckboxFieldOptionsDTO;
      case 'radio':
        return UpdateRadioFieldOptionsDTO;
      case 'combobox':
        return UpdateComboboxFieldOptionsDTO;
      default:
        throw new Error(`Unknown field type: ${object.type}`);
    }
  })
  options!: UpdateFieldOptionsDTO;
}
