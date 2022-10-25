import Ripple from 'material-ripple-effects';
import React from 'react';
import type { VariantProps } from 'cva';
import { cva } from 'cva';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'>, VariantProps<typeof button> { }

const button = cva(['btn', 'inline-flex', 'jc:center', 'ai:center', 'r:6', 'f:medium', '~color|250ms'], {
  variants: {
    variant: {
      base: ['px:16', 'py:4', 'bg:gray-90', 'font:black'],
      icon: ['w:40', 'h:40', 'round', 'overflow:hidden'],
      outline: [
        'px:16',
        'py:6',
        'b:2|solid|white',
        'bg:white/95',
        '~background-color|250ms,color|250ms',
        'bg:transparent:hover',
        'font:black',
        'font:white:hover',
      ],
    },
    size: {
      small: ['w:5', 'h:5'],
    },
  },
  defaultVariants: {
    variant: 'base',
  },
});

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, ...props }, forwardedRef) => {
    const ripple = new Ripple();

    return (
      <button
        className={button({ variant, size, class: className })}
        onMouseDown={e => ripple.create(e, 'dark')}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
