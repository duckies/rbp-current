import type { FieldDiscriminator, FieldOptionsDiscriminator } from "@rbp/server"
import { CharacterField } from "features/application/components/fields/Character"
import { Textarea } from "features/application/components/fields/Textarea"
import { Textfield } from "features/application/components/fields/Textfield"

type FieldComponent = typeof Textfield | typeof Textarea | typeof CharacterField

// TODO: This needs to be worked on to not require coercion of `FormField` to `any`.
export const getFieldComponent = (field: FieldDiscriminator): FieldComponent => {
  switch (field.type) {
    case "text":
      return field.options?.multiline ? Textarea : Textfield
    // case 'select':
    //   return Select;
    case "character":
      return CharacterField
    default:
      throw new Error(`Unhandled or unknown field type: ${field.type}`)
  }
}

export const getFieldDefaultValue = (field: FieldOptionsDiscriminator) => {
  switch (field.type) {
    case "text":
      return ""
    case "character": {
      const characterPlaceholder = { region: "us", realm: "", name: "" }
      return (field.options?.multiple && [characterPlaceholder]) || characterPlaceholder
    }
    case "checkbox":
      return false
    case "combobox":
      return null
    case "number":
      return null
    case "radio":
      return null
    case "select":
      return null
  }
}
