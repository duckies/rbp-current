import { Listbox } from "@headlessui/react"
import { FieldError } from "components/forms/shared/FieldError"
import { label as labelCSS } from "components/forms/shared/Label"
import type { FieldProps } from "features/application/useForm"
import type { FC } from "react"
import { useController } from "react-hook-form"
import { FormFieldStyles } from "styles/components/forms"
import { listbox, option } from "styles/components/listbox"
import type { DOMProps } from "types/shared"

type Item = {
  text: string
  value: any
}

type SelectProps = Omit<DOMProps<"select">, "name" | "form"> &
  FieldProps & {
    label?: string
    items: Item[]
  }

export const Select: FC<SelectProps> = ({ id, label, items, form }) => {
  const { field, fieldState } = useController({ name: id, control: form.control })
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
