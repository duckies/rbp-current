import { FieldError } from "components/forms/shared/FieldError"
import FieldWrapper from "components/forms/shared/InputWrapper"
import Label from "components/forms/shared/Label"
import type { FieldValues } from "react-hook-form"
import { FormFieldStyles } from "styles/components/forms"
import type { FieldProps } from "types/forms"

export type TextfieldProps<T extends FieldValues> = FieldProps<T> & {
  id: string
  label: string
  className?: string
}

export function Textfield<T extends FieldValues>(props: TextfieldProps<T>) {
  const { id, label, className, name, form, ...inputProps } = props
  const { error } = form.getFieldState(name as never, form.formState)

  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <FieldWrapper>
        <input
          type="text"
          id={id}
          className={FormFieldStyles()}
          {...inputProps}
          {...form.register(name as never)}
        />
      </FieldWrapper>
      {error && <FieldError>{error.message}</FieldError>}
    </div>
  )
}
