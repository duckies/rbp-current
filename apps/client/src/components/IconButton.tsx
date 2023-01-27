import type { VariantProps } from "cva"
import { cva } from "cva"
import type { ComponentPropsWithRef } from "react"
import { forwardRef } from "react"

const ButtonStyles = cva(["w-7", "h-7", "overflow-hidden", "content-center"], {
  variants: {
    size: {
      small: ["w-[5px]", "h-[5px]"],
      medium: ["w-7", "h-7"],
      large: ["w-8", "h-8"],
    },
    rounded: {
      false: "",
      true: ["rounded-full"],
    },
  },
  defaultVariants: {
    size: "medium",
    rounded: true,
  },
})

type ButtonProps = VariantProps<typeof ButtonStyles> & ComponentPropsWithRef<"button">

export const IconButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, size, rounded, ...props }, ref) => {
    return <button ref={ref} className={ButtonStyles({ className, size, rounded })} {...props} />
  }
)

IconButton.displayName = "IconButton"
