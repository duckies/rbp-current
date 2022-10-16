import clsx from 'clsx';
import React from 'react';
import css from 'styles/components/button.module.scss';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'icon' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <button
        className={clsx(className, css.button, {
          [css.icon]: props.variant === 'icon',
          [css.outline]: props.variant === 'outline',
        })}
        {...props}
        ref={forwardedRef}
      />
    );
  }
);

Button.displayName = 'Button';
