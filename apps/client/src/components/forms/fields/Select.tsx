import { ListBox } from 'components/common/ListBox'
import { Popover } from 'components/overlays/Popover'
import { ChevronDownIcon } from 'components/icons/ChevronDown'
import type { VariantProps } from 'cva'
import { cva } from 'cva'
import React from 'react'
import type { AriaSelectOptions } from 'react-aria'
import {
  HiddenSelect,
  mergeProps,
  useButton,
  useFocusRing,
  useSelect,
} from 'react-aria'
import { Item, Section, useSelectState } from 'react-stately'
import { FormFieldStyles } from 'styles/components/forms'
import Label from 'components/forms/shared/Label'
import clsx from 'clsx'

export interface SelectProps<T> extends AriaSelectOptions<T> {
  className?: string
  hideLabel?: boolean
  variant?: VariantProps<typeof select>['variant']
}

const classes = cva(['relative', 'inline-flex', 'flex-col', 'w-full'])

const select = cva([], {
  variants: {
    variant: {
      default: FormFieldStyles(),
      plain: [''],
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

function Select<T extends object>({ className, ...props }: SelectProps<T>) {
  const state = useSelectState(props)
  const ref = React.useRef(null)

  const { labelProps, triggerProps, valueProps, menuProps } = useSelect(
    props,
    state,
    ref,
  )

  const { buttonProps } = useButton(triggerProps, ref)
  const { focusProps, isFocusVisisble } = useFocusRing()

  return (
    <div className={classes({ class: className })}>
      <Label
        {...labelProps}
        className={clsx(['block', props.hideLabel && 'sr-only'])}
      >
        {props.label}
      </Label>

      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />

      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={select({
          variant: props.variant,
        })}
        // className="flex ai:center px:10 py:8 rel w:full r:6 b:2|solid|gray-30 focus-ring inline-flex flex:row outline-offset:-2px"
      >
        <span {...valueProps} className="relative flex items-start">
          {state.selectedItem
            ? state.selectedItem.rendered
            : 'Select an option'}
        </span>

        <div className="absolute flex items-center h-full top-0 right-0 p-4 font:white">
          <ChevronDownIcon className="w-5 h-5" />
        </div>
      </button>

      {state.isOpen && (
        <Popover state={state} triggerRef={ref} placement="bottom start">
          <ListBox {...menuProps} state={state} />
        </Popover>
      )}
    </div>
  )
}

Select.Item = Item
Select.Section = Section

export default Select
