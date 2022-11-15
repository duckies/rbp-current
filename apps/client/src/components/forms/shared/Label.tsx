import type { LabelProps } from '@radix-ui/react-label'
import { Label as BaseLabel } from '@radix-ui/react-label'
import { cva } from 'cva'

const label = cva(['block', 'font-medium', 'mb-2'])

export default function Label({ className, ...props }: LabelProps) {
  return <BaseLabel className={label({ class: className })} {...props} />
}
