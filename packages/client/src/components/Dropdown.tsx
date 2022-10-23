import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import type {
  DropdownMenuItemProps,
  DropdownMenuSubContentProps,
} from '@radix-ui/react-dropdown-menu';
import React, { createElement } from 'react';
import clsx from 'clsx';

export type DropdownContentProps = DropdownMenuSubContentProps &
  React.HTMLAttributes<HTMLDivElement>;

export const DropdownMenuContent = React.forwardRef<
  HTMLDivElement,
  DropdownContentProps
>(({ children, className, ...props }, forwardedRef) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        className={clsx(
          'relative min-w-[150px] p-2 rounded-md bg-slate-900/95 shadow-lg backdrop-blur-sm backdrop-saturate-150',
          className
        )}
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
  const itemClass = clsx(
    'relative flex items-center h-7 px-3 select-none hover:bg-gray-500/50',
    className
  );

  return createElement(
    DropdownMenuPrimitive.Item,
    { className: itemClass, ...props },
    children
  );
}

export const DropdownMenu = DropdownMenuPrimitive.Root;
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;
export const DropdownMenuItem = Item;
// CheckboxItem?
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

DropdownMenuContent.displayName = 'DropdownMenuContent';
