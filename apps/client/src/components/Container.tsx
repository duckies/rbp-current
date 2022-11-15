import { cva } from 'cva'
import React, { type ElementType } from 'react'

export type ContainerProps<T extends ElementType = 'div'> = {
  as?: T
} & React.ComponentPropsWithoutRef<T>

const container = cva(['max-w-[64rem]', 'mx-auto', 'px-8'])

export function Container<T extends ElementType = 'div'>(
  props: ContainerProps<T>,
) {
  const { as = 'div', className, children } = props
  return React.createElement(
    as,
    { className: container({ class: className }) },
    children,
  )
}
