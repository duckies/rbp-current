import type { Control, UseFormRegister } from "react-hook-form"

export interface Item {
  text: string
  value: any
}

export type FormValues = Record<string, any>

export type FieldProps<T extends FormValues = Record<string, any>> = {
  id: string
  error?: string
  register: UseFormRegister<T>
}

export type ControlledFieldProps<T extends FormValues = Record<string, any>> = FieldProps<T> & {
  control: Control<T>
}
