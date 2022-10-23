import Ripple from 'material-ripple-effects';
import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps extends React.ComponentPropsWithoutRef<'button'> {
  variant?: 'icon' | 'outline'
  size?: 'small' | 'large'
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, forwardedRef) => {
    const ripple = new Ripple();

    return (
      <button
        className={twMerge(
          'inline-flex justify-center items-center px-4 py-1 rounded-md font-medium transition-color',
          variant === 'icon' && 'w-10 h-10 p-0 rounded-full overflow-hidden',
          variant === 'outline'
            && 'border-2 border-white bg-white/95 transition-colors hover:bg-transparent text-black hover:text-white',
          size === 'small' && variant === 'icon' && 'w-5 h-5',
          className,
        )}
        {...props}
        onMouseDown={e => ripple.create(e, 'dark')}
        ref={forwardedRef}
      />
    );
  },
);

Button.displayName = 'Button';
