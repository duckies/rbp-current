import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type {
  DropdownMenuItemProps,
  DropdownMenuSubContentProps,
} from '@radix-ui/react-dropdown-menu';
import React, { createElement } from 'react';
import clsx from 'clsx';
import css from 'styles/components/dropdown.module.scss';

export type DropdownContentProps = DropdownMenuSubContentProps &
  React.HTMLAttributes<HTMLDivElement>;

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownContentProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={clsx(className, css.content)}
        {...props}
        ref={forwardedRef}
      >
        {children}
      </DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Portal>
  );
});

export type DropdownItemProps = DropdownMenuItemProps &
  React.HTMLAttributes<HTMLDivElement>;

function Item({ children, className, ...props }: DropdownItemProps) {
  return createElement(
    DropdownMenuPrimitive.Item,
    { className: clsx(className, css.item), ...props },
    children
  );
}

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuItem = Item;
// CheckboxItem?
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

DropdownMenuContent.displayName = 'DropdownMenuContent';
