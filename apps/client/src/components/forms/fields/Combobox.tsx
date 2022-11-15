import { ListBox } from 'components/common/ListBox'
import Label from 'components/forms/shared/Label'
import { ChevronDownIcon } from 'components/icons/ChevronDown'
import { Popover } from 'components/overlays/Popover'
import React, { useLayoutEffect } from 'react'
import type { AriaComboBoxOptions } from 'react-aria'
import { useButton, useComboBox, useFilter } from 'react-aria'
import { useComboBoxState } from 'react-stately'
import { FormFieldStyles } from 'styles/components/forms'

export type ComboBoxProps<T extends object> = AriaComboBoxOptions<T> &
  React.ComponentPropsWithRef<'input'>

export function ComboBox<T extends object>(props: ComboBoxProps<T>) {
  const inputWidth = React.useRef<number | null>(null)
  const { contains } = useFilter({ sensitivity: 'base' })
  const state = useComboBoxState({ ...props, defaultFilter: contains })

  const buttonRef = React.useRef(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const listBoxRef = React.useRef(null)
  const popoverRef = React.useRef(null)

  const { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state,
  )

  useLayoutEffect(() => {
    inputWidth.current = inputRef.current?.offsetWidth || null
  }, [])

  return (
    <div className="relative inline-flex flex-col w-full">
      <Label {...labelProps}>{props.label}</Label>
      <div className="relative inline-block">
        <input
          {...inputProps}
          ref={inputRef}
          className={FormFieldStyles({ class: props.className })}
        />
        <Button {...buttonProps} buttonRef={buttonRef} className="ml-0">
          <ChevronDownIcon aria-hidden className="absolute right-0 p-3" />
        </Button>
        {state.isOpen && (
          <Popover
            popoverRef={popoverRef}
            triggerRef={inputRef}
            state={state}
            isNonModal
            placement="bottom start"
          >
            <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
          </Popover>
        )}
      </div>
    </div>
  )
}

function Button(props: any) {
  const ref = props.buttonRef
  const { buttonProps } = useButton(props, ref)

  return (
    <button {...buttonProps} ref={ref} style={props.style}>
      {props.children}
    </button>
  )
}
