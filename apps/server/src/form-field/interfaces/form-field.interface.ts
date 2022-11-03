import { FieldType } from '../../entities';

export interface FieldBase {
  type: FieldType
}

export interface TextField extends FieldBase {
  type: FieldType.Text
  options: {
    minLength?: number
    maxLength?: number
  }
}

export interface RadioField extends FieldBase {
  type: FieldType.Radio
  options: {
    items: { label: string; value: string }[]
  }
}

export interface SelectField extends FieldBase {
  type: FieldType.Select
  options: {
    multiple?: boolean
    items: { label: string; value: string }[]
  }
}

export interface CheckboxField extends FieldBase {
  type: FieldType.Checkbox
}
