import React from 'react';
import InputWrapper from 'components/forms/shared/InputWrapper';
import Label from 'components/forms/shared/Label';
import { FormFieldStyles } from 'styles/components/forms';

export interface TextfieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> {
  id: string | number
  label: string
  className?: string
  error?: string
}

export default function Textfield({ id, className, error, ...props }: TextfieldProps) {
  const forId = `textfield-${id}`;

  return (
    <div className={className}>
      <Label htmlFor={forId}>{props.label}</Label>
      <InputWrapper>
        <input
          className={FormFieldStyles({ class: className })}
          type="text"
          id={forId}
          {...props}
        />
      </InputWrapper>
      {error && (<span className="text-red-400">{error}</span>)}
    </div >
  );
}
