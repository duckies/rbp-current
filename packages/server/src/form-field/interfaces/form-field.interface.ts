import { FieldType } from '@prisma/client'

export interface FieldBase {
  type: FieldType
}

export interface TextField extends FieldBase {
  type: 'Text'
  options: {
    minLength?: number
    maxLength?: number
  }
}

export interface RadioField extends FieldBase {
  type: 'Radio'
  options: {
    items: { label: string; value: string }[]
  }
}

export interface SelectField extends FieldBase {
  type: 'Select'
  options: {
    multiple?: boolean
    items: { label: string; value: string }[]
  }
}

export interface CheckboxField extends FieldBase {
  type: 'Checkbox'
}
