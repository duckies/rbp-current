import type { FieldType, FormField } from '@prisma/client';
import { BaseOptionsDTO, CharacterFieldOptionsDTO, ComboboxFieldOptionsDTO, SelectFieldOptionsDTO, TextFieldOptionsDTO } from '../dto/field-options.dto';

type FormFieldEntityBaseDTO = Omit<FormField, 'options'>;

export type TextFieldEntityDTO = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Text
  options?: TextFieldOptionsDTO
};

export type CheckboxFormFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Checkbox
  options?: BaseOptionsDTO
};

export type SelectFormFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Select
  options: SelectFieldOptionsDTO
};

export type ComboboxFormFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Combobox
  options: ComboboxFieldOptionsDTO
};

export type CharacterFieldEntity = FormFieldEntityBaseDTO & {
  type: typeof FieldType.Character
  options?: CharacterFieldOptionsDTO
};

export type FormFieldEntityDTO =
  | SelectFormFieldEntity
  | ComboboxFormFieldEntity
  | TextFieldEntityDTO
  | CheckboxFormFieldEntity
  | CharacterFieldEntity;
