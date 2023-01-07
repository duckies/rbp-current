import { FieldError } from "components/forms/shared/FieldError"
import FieldWrapper from "components/forms/shared/InputWrapper"
import Label from "components/forms/shared/Label"
import type { FieldProps } from "features/application/types"
import { FormFieldStyles } from "styles/components/forms"

export type TextfieldProps = FieldProps & {
  label: string
}

export function Textfield({ id, label, error, register }: TextfieldProps) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <FieldWrapper>
        <input type="text" id={id} className={FormFieldStyles()} {...register(id)} />
      </FieldWrapper>
      {error && <FieldError>{error}</FieldError>}
    </div>
  )
}
