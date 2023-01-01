import { Combobox as HeadlessCombobox } from "@headlessui/react"
import { FieldError } from "components/forms/shared/FieldError"
import { label as labelCSS } from "components/forms/shared/Label"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import { useState } from "react"
import type { FieldValues } from "react-hook-form"
import { useController } from "react-hook-form"
import { FormFieldStyles } from "styles/components/forms"
import { listbox, option } from "styles/components/listbox"
import type { FieldProps, Item } from "types/forms"

type ComboboxProps<T extends FieldValues> = FieldProps<T> & {
  items: Item[]
  label?: string
  initialValue?: Item
}

export function Combobox<T extends FieldValues>(props: ComboboxProps<T>) {
  const { label, items, name, form, ...inputProps } = props
  const { field, fieldState } = useController({ name: name as never, control: form.control })

  const [query, setQuery] = useState("")
  const filteredItems =
    query === "" ? items : items.filter((i) => i.text.toLowerCase().includes(query.toLowerCase()))
  const selectedItem = (field.value && items.find((i) => i.value === field.value)) || null

  return (
    <HeadlessCombobox as="div" value={selectedItem} onChange={field.onChange}>
      <HeadlessCombobox.Label className={labelCSS()}>{label}</HeadlessCombobox.Label>

      <div className="relative mt-1">
        <HeadlessCombobox.Input
          {...inputProps}
          className={FormFieldStyles()}
          onChange={(e) => setQuery(e.target.value)}
          displayValue={(item: Item) => item?.text}
        />

        <HeadlessCombobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronDownIcon className="h-5 w-5" aria-hidden />
        </HeadlessCombobox.Button>

        {filteredItems.length > 0 && (
          <HeadlessCombobox.Options className={listbox()}>
            {filteredItems.map((item) => (
              <HeadlessCombobox.Option
                key={item.value}
                value={item.value}
                className={({ active, selected }) =>
                  option({ status: active ? "active" : selected ? "selected" : null })
                }
              >
                <span>{item.text}</span>
              </HeadlessCombobox.Option>
            ))}
          </HeadlessCombobox.Options>
        )}
      </div>

      {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
    </HeadlessCombobox>
  )
}
