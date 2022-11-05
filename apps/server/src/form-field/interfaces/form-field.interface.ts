import {
  CreateCharacterFieldOptionsDTO,
  CreateCheckboxFieldOptionsDTO,
  CreateComboboxFieldOptionsDTO,
  CreateNumberFieldOptionsDTO,
  CreateRadioFieldOptionsDTO,
  CreateSelectFieldOptionsDTO,
  CreateTextFieldOptionsDTO,
} from '../dto/create-field-options.dto';
import { FormField } from '../form-field.entity';

export interface TextField {
  type: 'text'
  options?: CreateTextFieldOptionsDTO
}

export interface NumberField {
  type: 'number'
  options?: CreateNumberFieldOptionsDTO
}

export interface RadioField {
  type: 'radio'
  options: CreateRadioFieldOptionsDTO
}

export interface SelectField {
  type: 'select'
  options: CreateSelectFieldOptionsDTO
}

export interface ComboboxField {
  type: 'combobox'
  options: CreateComboboxFieldOptionsDTO
}

export interface CheckboxField {
  type: 'checkbox'
  options?: CreateCheckboxFieldOptionsDTO
}

export interface CharacterField {
  type: 'character'
  options?: CreateCharacterFieldOptionsDTO
}

export type FieldOptionsDiscriminator =
  | TextField
  | NumberField
  | RadioField
  | SelectField
  | ComboboxField
  | CheckboxField
  | CharacterField;

export type FieldDiscriminator = Omit<FormField, 'options'> & FieldOptionsDiscriminator;
