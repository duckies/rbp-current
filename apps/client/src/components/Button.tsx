import Ripple from 'material-ripple-effects';
import React from 'react';
import type { VariantProps } from 'cva';
import { cva } from 'cva';
import type { AriaButtonProps } from 'react-aria';
import { useButton } from 'react-aria';
import { useObjectRef } from '@react-aria/utils';

export type ButtonProps = AriaButtonProps &
React.ComponentPropsWithRef<'button'> &
VariantProps<typeof button>;

const button = cva(
  [
    'btn',
    'inline-flex',
    'jc:center',
    'ai:center',
    'r:6',
    'f:medium',
    '~color|250ms',
  ],
  {
    variants: {
      variant: {
        plain: [],
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
      state: {
        disabled: ['cursor:not-allowed', 'opacity:50'],
      },
      size: {
        small: ['w:5', 'h:5'],
      },
    },
    defaultVariants: {
      variant: 'base',
    },
  },
);

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef);
    const { buttonProps } = useButton(props, ref);

    const ripple = new Ripple();

    const onMouseDown = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      ripple.create(e, 'dark');
      buttonProps.onMouseDown?.(e);
    };

    return (
      <button
        ref={ref}
        className={button({
          variant,
          size,
          state: buttonProps.disabled ? 'disabled' : null,
          class: className,
        })}
        onMouseDown={onMouseDown}
        {...buttonProps}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
