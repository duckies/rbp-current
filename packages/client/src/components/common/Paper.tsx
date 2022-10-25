import { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

export interface PaperProps extends React.ComponentPropsWithRef<'div'> {}

export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ children, className, ...props }, ref) => {
    const classes = twMerge('bg-neutral-800 rounded-lg shadow-lg', className);

    return <div className={classes} {...props} ref={ref}>{children}</div>;
  },
);

Paper.displayName = 'Paper';
