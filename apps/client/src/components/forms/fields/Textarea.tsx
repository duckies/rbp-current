import { cva } from 'cva';
import Label from 'components/forms/shared/Label';
import InputWrapper from 'components/forms/shared/InputWrapper';

export interface TextareaProps
  extends Omit<React.ComponentPropsWithoutRef<'textarea'>, 'id'> {
  id: string | number
  label: string
}

const classes = cva([
  'block',
  'w:full',
  'px:10',
  'py:8',
  'min-h:100',
  'resize:vertical',
  'focus-ring',
  'r:6',
]);

export default function Textarea({ id, className, ...props }: TextareaProps) {
  return (
    <div>
      <Label htmlFor={`textarea-${id}`}>{props.label}</Label>
      <InputWrapper>
        <textarea
          id={`textarea-${id}`}
          className={classes({ class: className })}
          {...props}
        />
      </InputWrapper>
    </div>
  );
}
