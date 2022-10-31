import type { LabelProps } from '@radix-ui/react-label';
import { Label as BaseLabel } from '@radix-ui/react-label';
import { cva } from 'cva';

const label = cva(['block', 'f:medium', 'mb:8']);

export default function Label({ className, ...props }: LabelProps) {
  return <BaseLabel className={label({ class: className })} {...props} />;
}
