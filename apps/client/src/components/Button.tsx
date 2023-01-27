import type { VariantProps } from "cva"
import { cva } from "cva"
import React from "react"
import type { DOMProps } from "types/shared"

export type ButtonProps = DOMProps<"button"> &
  VariantProps<typeof ButtonStyles> & { loading?: boolean }

const ButtonStyles = cva(
  [
    "inline-flex",
    "content-center",
    "items-center",
    "rounded-md",
    "transition-colors",
    "duration-250",
  ],
  {
    variants: {
      varianty: {
        button: ["text-black", "rounded-md"],
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
      intent: {
        primary: ["text-black", "bg-yellow-400", "hover:bg-yellow-200"],
        secondary: ["bg-gray-400", "hover:bg-gray-200"],
        tertiary: ["bg-surface-400", "hover: bg-surface-200"],
      },
      state: {
        disabled: ["cursor-not-allowed", "opacity-50"],
      },
      size: {
        medium: ["px-3", "py-1"],
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
    },
  }
)

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ intent: variant, size, className, children, loading, ...props }, forwardedRef) => {
    return (
      <button
        ref={forwardedRef}
        className={ButtonStyles({
          intent: variant,
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
