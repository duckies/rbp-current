import type { VariantProps } from "cva"
import { cva } from "cva"
import React from "react"
import type { DOMProps } from "types/shared"

export type ButtonProps = DOMProps<"button"> & VariantProps<typeof button>

const button = cva(
  [
    "inline-flex",
    "content-center",
    "items-center",
    "rounded-md",
    "text-[15px]",
    "transition-colors",
    "duration-250",
  ],
  {
    variants: {
      variant: {
        unstyled: "",
        base: ["px-3", "py-1", "bg-yellow-400", "hover:bg-yellow-200", "text-black"],
        icon: ["w-10", "h-10", "rounded-full", "overflow-hidden"],
        outline: [
          "px-3",
          "py-1",
          "border-2 border-solid",
          "bg-white/95",
          "transition-colors",
          "duration-250",
          "hover:bg-transparent",
          "text-black",
          "hover:text-white",
        ],
      },
      state: {
        disabled: ["cursor-not-allowed", "opacity-50"],
      },
      size: {
        small: ["w-[5px]", "h-[5px]"],
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, size, className, children, ...props }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        className={button({
          variant,
          size,
          state: props.disabled ? "disabled" : null,
          className,
        })}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
