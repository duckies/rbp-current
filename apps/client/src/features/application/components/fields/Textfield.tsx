import { FieldError } from "components/forms/shared/FieldError"
import FieldWrapper from "components/forms/shared/InputWrapper"
import Label from "components/forms/shared/Label"
import type { FieldProps } from "features/application/types"
import { FormFieldStyles } from "styles/components/forms"
import type { DOMProps } from "types/shared"

export type TextfieldProps = FieldProps &
  DOMProps<"div"> & {
    label: string
    inputProps?: DOMProps<"input">
  }

export function Textfield({
  id,
  label,
  error,
  register,
  rules,
  inputProps,
  ...domProps
}: TextfieldProps) {
  return (
    <div {...domProps}>
      <Label htmlFor={id}>{label}</Label>
      <FieldWrapper>
        <input
          type="text"
          id={id}
          className={FormFieldStyles()}
          {...register(id, { ...rules })}
          {...inputProps}
        />
      </FieldWrapper>
      {error && <FieldError>{error}</FieldError>}
    </div>
  )
}
