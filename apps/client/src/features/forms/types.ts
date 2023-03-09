import type { RegisterOptions, UseFormRegister } from "react-hook-form"

export type FieldProps = {
  id: string
  error?: string
  register: UseFormRegister<any>
  rules?: Pick<RegisterOptions, "required" | "validate">
}
