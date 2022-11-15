import Ripple from 'material-ripple-effects'
import React from 'react'
import type { VariantProps } from 'cva'
import { cva } from 'cva'
import type { AriaButtonProps } from 'react-aria'
import { useButton } from 'react-aria'
import { useObjectRef } from '@react-aria/utils'

export type ButtonProps = AriaButtonProps &
  React.ComponentPropsWithRef<'button'> &
  VariantProps<typeof button>

const button = cva(
  [
    'inline-flex',
    'content-center',
    'items-center',
    'rounded-md',
    'text-md',
    'transition-colors',
    'duration-250',
  ],
  {
    variants: {
      variant: {
        plain: [],
        base: ['px-3', 'py-1', 'bg-yellow-400', 'text-black'],
        icon: ['w-10', 'h-10', 'rounded-full', 'overflow-hidden'],
        outline: [
          'px-4',
          'py-1.5',
          'border-2 border-solid',
          'bg-white/95',
          'transition-colors',
          'duration-250',
          'hover:bg-transparent',
          'text-black',
          'hover:text-white',
        ],
      },
      state: {
        disabled: ['cursor-not-allowed', 'opacity-50'],
      },
      size: {
        small: ['w-[5px]', 'h-[5px]'],
      },
    },
    defaultVariants: {
      variant: 'base',
    },
  },
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, forwardedRef) => {
    const ref = useObjectRef(forwardedRef)
    const { buttonProps } = useButton(props, ref)

    const ripple = new Ripple()

    const onMouseDown = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ) => {
      ripple.create(e, 'dark')
      buttonProps.onMouseDown?.(e)
    }

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
    )
  },
)

Button.displayName = 'Button'

export default Button
