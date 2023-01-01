import { Listbox } from "@headlessui/react"
import { FieldError } from "components/forms/shared/FieldError"
import { label as labelCSS } from "components/forms/shared/Label"
import type { FieldValues } from "react-hook-form"
import { useController } from "react-hook-form"
import { FormFieldStyles } from "styles/components/forms"
import { listbox, option } from "styles/components/listbox"
import type { FieldProps } from "types/forms"
import type { DOMProps } from "types/shared"

type Item = {
  text: string
  value: any
}

type SelectProps<T extends FieldValues> = Omit<DOMProps<"select">, "name" | "form"> &
  FieldProps<T> & {
    label?: string
    items: Item[]
  }

export function Select<T extends FieldValues>({ label, items, name, form }: SelectProps<T>) {
  const { field, fieldState } = useController({ name: name as never, control: form.control })

  const selectedItem = (field.value && items.find((i) => i.value === field.value)) || null

  return (
    <Listbox
      as="div"
      className="relative inline-flex w-full flex-col"
      value={selectedItem}
      onChange={field.onChange}
    >
      <Listbox.Label className={labelCSS()}>{label}</Listbox.Label>

      <div className="relative">
        <Listbox.Button
          className={FormFieldStyles({ class: "form-select text-left" })}
          ref={field.ref}
        >
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
