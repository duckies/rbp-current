import { cva } from 'cva'
import { forwardRef } from 'react'

export interface PaperProps extends React.ComponentPropsWithRef<'div'> {}

const classes = cva(['p-8', 'bg-surface-700', 'rounded-md', 'shadow-lg'])

export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={classes({ class: className })} {...props} ref={ref}>
        {children}
      </div>
    )
  },
)

Paper.displayName = 'Paper'

export default Paper
