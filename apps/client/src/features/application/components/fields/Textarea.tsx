import { FieldError } from "components/forms/shared/FieldError"
import FieldWrapper from "components/forms/shared/InputWrapper"
import Label from "components/forms/shared/Label"
import type { FieldProps } from "features/application/types"
import { FormFieldStyles } from "styles/components/forms"

export type TextareaProps = FieldProps & {
  label: string
}

export function Textarea({ id, label, error, register, rules }: TextareaProps) {
  return (
    <div>
      <Label htmlFor={`textarea-${id}`}>{label}</Label>
      <FieldWrapper>
        <textarea
          id={`textarea-${id}`}
          className={FormFieldStyles()}
          {...register(id, { ...rules })}
        />
      </FieldWrapper>
      {error && <FieldError>{error}</FieldError>}
    </div>
  )
}
