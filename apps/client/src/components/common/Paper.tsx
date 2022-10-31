import { cva } from 'cva';
import { forwardRef } from 'react';

export interface PaperProps extends React.ComponentPropsWithRef<'div'> { }

const classes = cva([
  'p:32',
  'bg:gray-6',
  'r:10',
  'box-shadow:0|10|8|rgb(0,0,0/0.4)',
  'box-shadow:0|4|3|rgb(0,0,0,0.1)',
]);

export const Paper = forwardRef<HTMLDivElement, PaperProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div className={classes({ class: className })} {...props} ref={ref}>
        {children}
      </div>
    );
  },
);

Paper.displayName = 'Paper';

export default Paper;
