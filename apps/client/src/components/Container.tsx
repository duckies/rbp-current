import React, { type ElementType } from "react"
import { cn } from "utils/cn"

type ContainerProps<T extends ElementType = "div"> = React.ComponentPropsWithoutRef<T> & {
  as?: T
}

export function Container<T extends ElementType = "div">(props: ContainerProps<T>) {
  const { as = "div", className, children } = props
  return React.createElement(
    as,
    { className: cn("max-w-[65rem] mx-auto px-8", className) },
    children
  )
}
