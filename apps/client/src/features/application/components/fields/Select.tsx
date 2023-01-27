import { Listbox } from "@headlessui/react"
import clsx from "clsx"
import { FieldError } from "components/forms/shared/FieldError"
import { label as labelCSS } from "components/forms/shared/Label"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import type { ControlledFieldProps, Item } from "features/application/types"
import { useController } from "react-hook-form"
import { FormFieldStyles } from "styles/components/forms"
import { listbox, option } from "styles/components/listbox"
import type { DOMProps } from "types/shared"

export type SelectProps = ControlledFieldProps &
  DOMProps<"div"> & {
    label: string
    items: Item[]
  }

export function Select({ id, label, items, control, className }: SelectProps) {
  const { field, fieldState } = useController({ name: id, control })
  const selectedItem = (field.value && items.find((i) => i.value === field.value)) || null

  return (
    <Listbox
      as="div"
      className={clsx("relative inline-flex w-full flex-col", className)}
      value={selectedItem}
      onChange={field.onChange}
      onBlur={field.onBlur}
    >
      <Listbox.Label className={labelCSS()}>{label}</Listbox.Label>

      <div className="relative">
        <Listbox.Button className={FormFieldStyles({ class: "text-left" })}>
          {({ value }) => <span className="inline-block h-[1rem]">{value?.text}</span>}
        </Listbox.Button>
        <span className="absolute inset-y-0 right-1 top-0 flex items-center px-2">
          <ChevronDownIcon className="h-5 w-5 text-gray-500" aria-hidden />
        </span>

        <Listbox.Options className={listbox()}>
          {items.map((item) => (
            <Listbox.Option
              key={item.value}
              value={item.value}
              className={({ active, selected }) =>
                option({ status: active ? "active" : selected ? "selected" : null })
              }
            >
              {item.text}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
      {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
    </Listbox>
  )
}
