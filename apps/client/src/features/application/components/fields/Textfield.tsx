import { FieldError } from "components/forms/shared/FieldError"
import FieldWrapper from "components/forms/shared/InputWrapper"
import Label from "components/forms/shared/Label"
import type { FieldProps } from "features/application/useForm"
import { FormFieldStyles } from "styles/components/forms"

export type TextfieldProps = FieldProps & {
  label: string
}

export const Textfield = (props: TextfieldProps) => {
  const { id, label, form, ...inputProps } = props
  const { error } = form.getFieldState(id, form.formState)

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <FieldWrapper>
        <input
          type="text"
          id={id}
          className={FormFieldStyles()}
          {...inputProps}
          {...form.register(id)}
        />
      </FieldWrapper>
      {error && <FieldError>{error.message}</FieldError>}
    </div>
  )
}
