import { cva } from 'cva';

export interface InputWrapperProps extends React.ComponentPropsWithoutRef<'div'> { }

const styles = cva([
  'rel',
  'mt:4',
  'r:6',
  'b:2px|solid|gray-30',
  'f:white',
]);

export default function InputWrapper({ className, children }: InputWrapperProps) {
  return <div className={styles({ class: className })}>{children}</div>;
}
