import type { VariantProps } from "cva"
import { cva } from "cva"
import React from "react"
import type { DOMProps } from "types/shared"

export type ButtonProps = DOMProps<"button"> & VariantProps<typeof button> & { loading?: boolean }

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
        icon: ["w-7", "h-7", "rounded-full", "overflow-hidden", "content-center"],
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
  ({ variant, size, className, children, loading, ...props }, forwardedRef) => {
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
        {loading && (
          <span>
            <svg width="32" height="32" viewBox="0 0 24 24">
              <circle cx="18" cy="12" r="0" fill="currentColor">
                <animate
                  attributeName="r"
                  begin=".67"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle cx="12" cy="12" r="0" fill="currentColor">
                <animate
                  attributeName="r"
                  begin=".33"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle cx="6" cy="12" r="0" fill="currentColor">
                <animate
                  attributeName="r"
                  begin="0"
                  calcMode="spline"
                  dur="1.5s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
            </svg>
          </span>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = "Button"

export default Button
