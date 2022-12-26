import type { FindCharacterDTO } from "@rbp/server"
import type { FieldError, Resolver } from "react-hook-form"

export const characterResolver: Resolver<FindCharacterDTO> = (values) => {
  const errors: Partial<Record<keyof FindCharacterDTO, FieldError>> = {}

  if (!values.region?.length) {
    errors.region = { type: "required", message: "Region is required" }
  }

  if (!values.realm?.length) {
    errors.realm = { type: "required", message: "Region is required" }
  }

  if (!values.name?.length) {
    errors.name = { type: "required", message: "Name is required" }
  } else if (values.name.length < 2) {
    errors.name = { type: "invalid_type", message: "Name too short!" }
  } else if (values.name.length > 12) {
    errors.name = { type: "invalid_type", message: "Name too long!" }
  }

  if (errors) {
    return {
      values: {},
      errors,
    }
  }

  return {
    values,
    errors: {},
  }
}
