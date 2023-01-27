import type { FindCharacterDTO } from "@rbp/server"
import type { Control, RegisterOptions, UseFormRegister } from "react-hook-form"

export interface Item {
  text: string
  value: any
}

export type FormValues = Record<string, any>

export type FieldProps = {
  id: string
  error?: string
  register: UseFormRegister<any>
  rules?: Pick<RegisterOptions, "required" | "validate">
}

export type ControlledFieldProps = FieldProps & {
  control: Control<any>
}

export type CharacterDTO = FindCharacterDTO & { main?: boolean }
