import type { FieldType, FormField } from '@prisma/client'
import type { OptionItemDTO } from '../dto/create-form-field.dto'

export type FormFieldEntityBase = Omit<FormField, 'options'>

export type SelectFormFieldEntity = FormFieldEntityBase & {
  type: typeof FieldType.Select
  options: {
    options: OptionItemDTO[]
    multiple?: boolean
  }
}

export type ComboboxFormFieldEntity = FormFieldEntityBase & {
  type: typeof FieldType.Combobox
  options: {
    options: OptionItemDTO[]
    multiple?: boolean
  }
}

export type TextFormFieldEntity = FormFieldEntityBase & {
  type: typeof FieldType.Text
}

export type TextareaFormFieldEntity = FormFieldEntityBase & {
  type: typeof FieldType.Textarea
}

export type CheckboxFormFieldEntity = FormFieldEntityBase & {
  type: typeof FieldType.Checkbox
}

export type FormFieldEntity =
  | SelectFormFieldEntity
  | ComboboxFormFieldEntity
  | TextFormFieldEntity
  | TextareaFormFieldEntity
  | CheckboxFormFieldEntity
