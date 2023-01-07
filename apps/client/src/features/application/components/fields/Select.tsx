import { Listbox } from "@headlessui/react"
import { FieldError } from "components/forms/shared/FieldError"
import { label as labelCSS } from "components/forms/shared/Label"
import type { ControlledFieldProps, Item } from "features/application/types"
import { useController } from "react-hook-form"
import { FormFieldStyles } from "styles/components/forms"
import { listbox, option } from "styles/components/listbox"

export type SelectProps = ControlledFieldProps & {
  label: string
  items: Item[]
}

export function Select({ id, label, items, control }: SelectProps) {
  const { field, fieldState } = useController({ name: id, control })
  const selectedItem = (field.value && items.find((i) => i.value === field.value)) || null

  return (
    <Listbox
      as="div"
      className="relative inline-flex w-full flex-col"
      value={selectedItem}
      onChange={field.onChange}
      onBlur={field.onBlur}
    >
      <Listbox.Label className={labelCSS()}>{label}</Listbox.Label>

      <div className="relative">
        <Listbox.Button className={FormFieldStyles({ class: "form-select text-left" })}>
          {({ value }) => <span className="inline-block h-[1rem]">{value?.text}</span>}
        </Listbox.Button>

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
