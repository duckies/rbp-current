import { FieldError } from "components/forms/shared/FieldError"
import FieldWrapper from "components/forms/shared/InputWrapper"
import Label from "components/forms/shared/Label"
import type { FieldProps } from "features/application/useForm"
import type { FC } from "react"
import { FormFieldStyles } from "styles/components/forms"
import type { DOMProps } from "types/shared"

export type TextareaProps = Omit<DOMProps<"textarea">, "form"> &
  FieldProps & {
    label: string
  }

export const Textarea: FC<TextareaProps> = (props) => {
  const { id, className, form, ...inputProps } = props
  const { error } = form.getFieldState(id, form.formState)

  return (
    <div>
      <Label htmlFor={`textarea-${id}`}>{props.label}</Label>
      <FieldWrapper>
        <textarea
          id={`textarea-${id}`}
          className={FormFieldStyles({ className })}
          {...inputProps}
          {...form.register(id)}
        />
      </FieldWrapper>
      {error && <FieldError>{error.message}</FieldError>}
    </div>
  )
}
