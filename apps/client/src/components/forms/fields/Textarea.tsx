import { FieldError } from "components/forms/shared/FieldError";
import FieldWrapper from "components/forms/shared/InputWrapper";
import Label from "components/forms/shared/Label";
import { cva } from "cva";
import { FieldValues } from "react-hook-form";
import { FieldProps } from "types/forms";
import { DOMProps } from "types/shared";

export type TextareaProps<T extends FieldValues> = Omit<DOMProps<"textarea">, "name" | "form"> &
  FieldProps<T> & {
    id: string | number;
    label: string;
  };

const classes = cva([
  "block",
  "w:full",
  "px:10",
  "py:8",
  "min-h:100",
  "resize:vertical",
  "focus-ring",
  "r:6",
]);

export function Textarea<T extends FieldValues>(props: TextareaProps<T>) {
  const { id, label, className, name, form, ...inputProps } = props;
  const { error } = form.getFieldState(name, form.formState);

  return (
    <div>
      <Label htmlFor={`textarea-${id}`}>{props.label}</Label>
      <FieldWrapper>
        <textarea id={`textarea-${id}`} className={classes({ className })} {...inputProps} />
      </FieldWrapper>
      {error && <FieldError>{error.message}</FieldError>}
    </div>
  );
}
