import type { DiscriminatedFormField, FindCharacterDTO } from "@rbp/server"
import { CharacterPicker } from "features/application/components/fields/Character"
import { Combobox } from "features/application/components/fields/Combobox"
import { Select } from "features/application/components/fields/Select"
import { Textarea } from "features/application/components/fields/Textarea"
import { Textfield } from "features/application/components/fields/Textfield"
import type { FieldProps } from "features/application/types"
import type { UseFormReturn } from "features/application/useForm"
import type { RegisterOptions } from "react-hook-form"

export function getFieldComponent(form: UseFormReturn, field: DiscriminatedFormField) {
  const error = form.formState.errors[field.id]
  const sharedProps: FieldProps & { label: string } = {
    id: field.id,
    label: field.label,
    error: (error?.root || error)?.message as string, // TODO: Investigate this weird type.
    register: form.register,
    rules: {
      required: field.options?.required ? "This field is required." : false,
    },
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
      sharedProps.rules!.validate = (value: Array<FindCharacterDTO & { main?: boolean }>) => {
        console.log("Validating", value)
        if (field.options.required && !value?.length) {
          return "You must select at least one character."
        }

        if (field.options.requireMain && !value?.find((c) => c.main)) {
          return "You must select at least one main character."
        }

        if (!field.options.multiple && value?.length > 1) {
          return "You can only select one character."
        }
      }
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
