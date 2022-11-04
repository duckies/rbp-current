import {
  CreateCharacterFieldOptionsDTO,
  CreateCheckboxFieldOptionsDTO,
  CreateComboboxFieldOptionsDTO,
  CreateNumberFieldOptionsDTO,
  CreateRadioFieldOptionsDTO,
  CreateSelectFieldOptionsDTO,
  CreateTextFieldOptionsDTO,
} from '../dto/create-field-options.dto';
import { FieldType } from '../form-field.entity';

export interface TextField {
  type: FieldType.Text
  options?: CreateTextFieldOptionsDTO
}

export interface NumberField {
  type: FieldType.Number
  options?: CreateNumberFieldOptionsDTO
}

export interface RadioField {
  type: FieldType.Radio
  options: CreateRadioFieldOptionsDTO
}

export interface SelectField {
  type: FieldType.Select
  options: CreateSelectFieldOptionsDTO
}

export interface ComboboxField {
  type: FieldType.Combobox
  options: CreateComboboxFieldOptionsDTO
}

export interface CheckboxField {
  type: FieldType.Checkbox
  options?: CreateCheckboxFieldOptionsDTO
}

export interface CharacterField {
  type: FieldType.Character
  options?: CreateCharacterFieldOptionsDTO
}

export type FieldDiscriminator =
  | TextField
  | NumberField
  | RadioField
  | SelectField
  | ComboboxField
  | CheckboxField
  | CharacterField;
