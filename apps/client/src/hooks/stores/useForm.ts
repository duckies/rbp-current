import type { FieldDiscriminator, Form } from "@rbp/server"
import { useQuery } from "@tanstack/react-query"
import CharacterSelector from "components/forms/fields/Character"
import { Textarea } from "components/forms/fields/Textarea"
import { Textfield } from "components/forms/fields/Textfield"
import { $get } from "lib/utils/fetch"

export function getForm(id: number) {
  return $get<Form>(`/form/${id}`)
}

export function useForm(id: number) {
  return useQuery(["form", id], () => getForm(id))
}

// TODO: This needs to be worked on to not require coercion of `FormField` to `any`.
export function getFieldComponent(field: FieldDiscriminator) {
  switch (field.type) {
    case "text":
      return field.options?.multiline ? Textarea : Textfield
    // case 'select':
    //   return Select;
    case "character":
      return CharacterSelector
    default:
      throw new Error(`Unhandled or unknown field type: ${field.type}`)
  }
}
