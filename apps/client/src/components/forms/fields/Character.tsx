import type { RealmSlug, Region } from "@rbp/battle.net/constants"
import { RealmMap, Regions } from "@rbp/battle.net/constants"
import type { FindCharacterDTO } from "@rbp/server"
import Button from "components/Button"
import { CharacterPreview } from "components/character/preview"
import { Combobox } from "components/forms/fields/Combobox"
import { Select } from "components/forms/fields/Select"
import { Textfield } from "components/forms/fields/Textfield"
import { characterResolver } from "features/Application/validators"
import type { FieldValues } from "react-hook-form"
import { useFieldArray, useForm } from "react-hook-form"
import type { ArrayFieldProps } from "types/forms"

export const RegionItems = Regions.map((r) => ({ text: r.toUpperCase(), value: r }))

export const Realms = Object.entries(RealmMap)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([text, value]) => ({
    text,
    value,
  }))

export type CharacterPickerProps<T extends FieldValues> = ArrayFieldProps<T> & {
  id: string | number
  disabled?: boolean
}

export type CharacterSelectorSchema = {
  region: Region
  realm: RealmSlug
  name: string
}

export default function CharacterSelector({
  id,
  name,
  form,
}: CharacterPickerProps<CharacterSelectorSchema>) {
  const subForm = useForm<CharacterSelectorSchema>({
    resolver: characterResolver,
    defaultValues: {
      region: "us",
      realm: null as never,
      name: "",
    },
  })

  const { fields, append, remove } = useFieldArray({ name, control: form.control })

  const onSubmit = () => {
    append({ ...(subForm.getValues() as any) })
  }

  return (
    <>
      <div className="mb-5 rounded-xl bg-surface-500 shadow-md">
        <div className="p-7">
          <h2 className="mb-2.5 text-2xl font-medium text-yellow">Character Selection</h2>
          <p className="my-2.5 text-gray-200">
            Link the main character you intend to raid with, and optionally any alts with noteworthy
            progression or logs.
          </p>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            <Select label="Region" items={RegionItems} name="region" form={subForm} />
            <Combobox label="Realm" items={Realms} name="realm" form={subForm} />
            <Textfield id={`${id}.name`} label="Name" name="name" form={subForm} />
          </div>
        </div>

        <div className="flex justify-end bg-surface-600 px-7 py-5">
          <Button type="button" onClick={subForm.handleSubmit(onSubmit)}>
            Add Character
          </Button>
        </div>
      </div>

      <div>
        {fields.map((field, index) => {
          // The types of this field prop are wildly confusing.
          const { id, ...character }: { id: string } & FindCharacterDTO = field as any

          return (
            <div key={field.id}>
              {/* <pre>{JSON.stringify(field, null, 2)}</pre> */}
              <input type="hidden" {...form.register(`${name}.${index}.region` as any)} />
              <input type="hidden" {...form.register(`${name}.${index}.realm` as any)} />
              <input type="hidden" {...form.register(`${name}.${index}.name` as any)} />
              <CharacterPreview character={character} />
            </div>
          )
        })}
      </div>
    </>
  )
}
