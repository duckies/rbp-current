import { Type } from 'class-transformer';
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min, ValidateNested,
} from 'class-validator';
import { FieldType } from '../form-field.entity';
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
  @IsEnum(FieldType)
  type!: FieldType;

  @IsOptional()
  @IsNumber()
  @Min(1)
  order?: number;

  @IsDefined()
  @ValidateNested()
  @Type(({ object }: any) => {
    switch (object.type) {
      case FieldType.Text:
        return UpdateTextFieldOptionsDTO;
      case FieldType.Select:
        return UpdateSelectFieldOptionsDTO;
      case FieldType.Number:
        return UpdateNumberFieldOptionsDTO;
      case FieldType.Character:
        return UpdateCharacterFieldOptionsDTO;
      case FieldType.Checkbox:
        return UpdateCheckboxFieldOptionsDTO;
      case FieldType.Radio:
        return UpdateRadioFieldOptionsDTO;
      case FieldType.Combobox:
        return UpdateComboboxFieldOptionsDTO;
      default:
        throw new Error(`Unknown field type: ${object.type}`);
    }
  })
  options!: UpdateFieldOptionsDTO;
}
