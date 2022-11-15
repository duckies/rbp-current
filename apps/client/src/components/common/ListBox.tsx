import type { AriaListBoxOptions } from 'react-aria'
import type { ListState } from 'react-stately'
import type { Node } from '@react-types/shared'
import { useListBox, useListBoxSection, useOption } from 'react-aria'
import React from 'react'
import { cva } from 'cva'

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: React.RefObject<HTMLUListElement>
  state: ListState<unknown>
}

interface SectionProps {
  section: Node<unknown>
  state: ListState<unknown>
}

interface OptionProps {
  item: Node<unknown>
  state: ListState<unknown>
}

export function ListBox(props: ListBoxProps) {
  const ref = React.useRef<HTMLUListElement>(null)
  const { listBoxRef = ref, state } = props
  const { listBoxProps } = useListBox(props, state, listBoxRef)

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className="w-full max-h-[200px] overflow-auto outline-none"
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  )
}

function ListBoxSection({ section, state }: SectionProps) {
  const { itemProps, headingProps, groupProps } = useListBoxSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  })

  return (
    <>
      <li {...itemProps} className="pt-2">
        {section.rendered && (
          <span
            {...headingProps}
            className="text-xs font-bold uppercase text-gray-500 mx-3"
          >
            {section.rendered}
          </span>
        )}
        <ul {...groupProps}>
          {[...section.childNodes].map((node) => (
            <Option key={node.key} item={node} state={state} />
          ))}
        </ul>
      </li>
    </>
  )
}

const optionClasses = cva(
  [
    'm-1',
    'p-2',
    'text-sm',
    'outline-none',
    'flex',
    'items-center',
    'justify-between',
    'hover:bg-surface-400',
  ],
  {
    variants: {
      state: {
        focused: ['text-pink'],
        selected: ['text-pink'],
        disabled: ['text-gray-50'],
      },
    },
  },
)

function Option({ item, state }: OptionProps) {
  const ref = React.useRef<HTMLLIElement>(null)
  const { optionProps, isDisabled, isSelected, isFocused } = useOption(
    {
      key: item.key,
    },
    state,
    ref,
  )

  return (
    <li
      {...optionProps}
      ref={ref}
      className={optionClasses({
        state: isDisabled
          ? 'disabled'
          : isSelected
          ? 'selected'
          : isFocused
          ? 'focused'
          : null,
      })}
    >
      {item.rendered}
    </li>
  )
}

ListBox.Option = Option
ListBox.Section = ListBoxSection
