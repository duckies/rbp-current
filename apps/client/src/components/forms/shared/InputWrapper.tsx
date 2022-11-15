import type { VariantProps } from 'cva';
import { cva } from 'cva';

export interface InputWrapperProps extends React.ComponentPropsWithoutRef<'div'>, VariantProps<typeof styles> { }

const styles = cva([
  'mt-1',
]);

export default function InputWrapper({ className, children }: InputWrapperProps) {
  return <div className={styles({ class: className })}>{children}</div>;
}
