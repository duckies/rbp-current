import { FieldType, FormField } from '../../entities';
import { BaseCreateOptionsDTO, CreateCharacterFieldOptionsDTO, CreateComboboxFieldOptionsDTO, CreateSelectFieldOptionsDTO, CreateTextFieldOptionsDTO } from '../dto/create-field-options.dto';

type FormFieldEntityBaseDTO = Omit<FormField, 'options'>;

export type TextFieldEntityDTO = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Text
  options?: CreateTextFieldOptionsDTO
};

export type CheckboxFormFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Checkbox
  options?: BaseCreateOptionsDTO
};

export type SelectFormFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Select
  options: CreateSelectFieldOptionsDTO
};

export type ComboboxFormFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Combobox
  options: CreateComboboxFieldOptionsDTO
};

export type CharacterFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Character
  options?: CreateCharacterFieldOptionsDTO
};

export type FormFieldEntityDTO =
  | SelectFormFieldEntity
  | ComboboxFormFieldEntity
  | TextFieldEntityDTO
  | CheckboxFormFieldEntity
  | CharacterFieldEntity;
