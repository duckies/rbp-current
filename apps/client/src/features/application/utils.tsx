import type { DiscriminatedFormField } from "@rbp/server"
import { CharacterPicker } from "features/application/components/fields/Character"
import { Combobox } from "features/application/components/fields/Combobox"
import { Select } from "features/application/components/fields/Select"
import { Textarea } from "features/application/components/fields/Textarea"
import { Textfield } from "features/application/components/fields/Textfield"
import type { RegisterOptions, UseFormReturn } from "react-hook-form"

export function getFieldComponent(form: UseFormReturn, field: DiscriminatedFormField) {
  const error = form.formState.errors[field.id]?.message as string | undefined
  const sharedProps = {
    key: field.id,
    id: field.id,
    label: field.label,
    error,
    register: form.register,
  }

  switch (field.type) {
    case "text": {
      const Component = field.options?.multiline ? Textarea : Textfield

      return <Component {...sharedProps} />
    }
    case "select":
      return <Select {...sharedProps} control={form.control} items={field.options.items} />
    case "combobox":
      return <Combobox {...sharedProps} control={form.control} items={field.options.items} />
    case "character":
      return <CharacterPicker {...sharedProps} control={form.control} />
    default:
      throw new Error(`Unhandled or unknown field type: ${field.type}`)
  }
}

export const getFieldDefaultValue = (field: DiscriminatedFormField) => {
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

export const getFieldValidator = (field: DiscriminatedFormField): RegisterOptions => {
  const options: RegisterOptions = {
    required: field.options?.required,
  }

  switch (field.type) {
    case "character":
    // options.validate = (value: any) => {
    // }
  }

  return options
}
