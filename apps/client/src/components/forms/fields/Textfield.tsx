import InputWrapper from "components/forms/shared/InputWrapper";
import Label from "components/forms/shared/Label";
import { FormFieldStyles } from "styles/components/forms";
import type { DOMProps } from "types/shared";

type TextfieldProps = DOMProps<"input"> & {
  label: string;
  className?: string;
  error?: string;
};

export default function Textfield(props: TextfieldProps) {
  const { id, label, error, className, ...inputProps } = props;

  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <InputWrapper>
        <input type="text" id={id} className={FormFieldStyles()} {...inputProps} />
      </InputWrapper>
      {error && <span className="text-red-400">{error}</span>}
    </div>
  );
}
