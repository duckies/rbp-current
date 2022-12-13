import type {
  DropdownMenuItemProps,
  DropdownMenuSubContentProps,
} from "@radix-ui/react-dropdown-menu"
import * as Radix from "@radix-ui/react-dropdown-menu"
import { cva } from "cva"
import type { FC } from "react"
import React, { createElement } from "react"

export type DropdownContentProps = DropdownMenuSubContentProps &
  React.HTMLAttributes<HTMLDivElement>

const contentCSS = cva([
  "relative",
  "min-w-[150px]",
  "rounded-md",
  "bg-surface-800/90",
  "p-3",
  "shadow-lg",
  "backdrop-blur-sm",
  "backdrop-saturate-150",
  "min-w-[120px]",
])

export const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownContentProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Radix.Portal>
        <Radix.Content className={contentCSS({ className })} {...props} ref={forwardedRef}>
          {children}
        </Radix.Content>
      </Radix.Portal>
    )
  }
)

export type DropdownItemProps = DropdownMenuItemProps & React.HTMLAttributes<HTMLDivElement>

const itemCSS = cva(
  "relative flex items-center h-7 pl-6 select-none rounded-md hover:bg-gray-500/50"
)()

export const RadioItem: FC<Radix.MenuRadioItemProps> = ({ children, ...props }) => {
  return createElement(Radix.RadioItem, { className: itemCSS, ...props }, children)
}

const itemIndicatorCSS = cva("absolute left-0")()

export const ItemIndicator: FC<Radix.MenuItemIndicatorProps> = ({ children, ...props }) => {
  return createElement(Radix.ItemIndicator, { className: itemIndicatorCSS, ...props }, children)
}

function Item({ children, ...props }: DropdownItemProps) {
  return createElement(Radix.Item, { className: itemCSS, ...props }, children)
}

export const DropdownMenu = Radix.Root
export const DropdownMenuTrigger = Radix.Trigger
export const DropdownMenuItem = Item
// CheckboxItem?
export const DropdownMenuRadioGroup = Radix.RadioGroup

DropdownMenuContent.displayName = "DropdownMenuContent"
