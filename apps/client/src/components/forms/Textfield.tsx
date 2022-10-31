import React from 'react';
import { cva } from 'cva';
import InputWrapper from 'components/forms/shared/InputWrapper';
import Label from 'components/forms/shared/Label';

export interface TextfieldProps extends Omit<React.ComponentPropsWithoutRef<'input'>, 'id'> {
  id: string | number
  label: string
  className?: string
}

const classes = cva([
  'block',
  'w:full',
  'px:10',
  'py:8',
  'focus-ring',
  'r:6',
]);

export default function Textfield({ id, className, ...props }: TextfieldProps) {
  const forId = `textfield-${id}`;

  return (
    <div className={className}>
      <Label htmlFor={forId}>{props.label}</Label>
      <InputWrapper>
        <input
          className={classes({ class: className })}
          type="text"
          id={forId}
          {...props}
        />
      </InputWrapper>
    </div >
  );
}
