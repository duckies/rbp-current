import type { DiscriminatedFormField } from "@rbp/server"
import type { FieldProps } from "features/forms/types"
import type { UseFormReturn } from "react-hook-form"

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
    case "text":
      return field.options?.multiline ? (
        <Textarea {...sharedProps} />
      ) : (
        <Textfield {...sharedProps} />
      )
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
