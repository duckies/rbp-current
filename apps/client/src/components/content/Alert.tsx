import type { VariantProps } from "cva"
import { cva } from "cva"
import type { FC, PropsWithChildren } from "react"

type AlertProps = VariantProps<typeof classes>

const classes = cva("not-prose mb-6 px-8 py-4 rounded-lg", {
  variants: {
    type: {
      info: "bg-yellow-300/30 border-2 border-yellow-300",
      warning: "bg-pink-700/30 border-2 border-pink-700",
    },
  },
  defaultVariants: {
    type: "info",
  },
})

export const Alert: FC<PropsWithChildren<AlertProps>> = ({ type, children }) => {
  return <div className={classes({ type })}>{children}</div>
}
