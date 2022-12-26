import { RealmMap, Regions } from "@rbp/battle.net/constants"
import type { FindCharacterDTO } from "@rbp/server"
import Button from "components/Button"
import { CharacterPreview } from "features/application/components/fields/CharacterPreview"
import { Combobox } from "features/application/components/fields/Combobox"
import { Select } from "features/application/components/fields/Select"
import { Textfield } from "features/application/components/fields/Textfield"
import type { FieldProps } from "features/application/useForm"
import { characterResolver } from "features/application/validators"
import type { FC } from "react"
import { useFieldArray, useForm } from "react-hook-form"

export const RegionItems = Regions.map((r) => ({ text: r.toUpperCase(), value: r }))

export const Realms = Object.entries(RealmMap)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([text, value]) => ({
    text,
    value,
  }))

export type CharacterDTO = FindCharacterDTO & { main?: boolean }
export type CharacterFieldProps = FieldProps

export const CharacterField: FC<CharacterFieldProps> = ({ id, form }) => {
  // We create a nested form only to control the name, realm, region fields.
  const subForm = useForm({
    resolver: characterResolver,
    defaultValues: {
      region: "us",
      realm: null as string | null,
      name: "",
    } as FindCharacterDTO,
  })

  // Then we use `useFieldArray` to hookup to the parent form.
  const { fields, append, remove } = useFieldArray({ name: id, control: form.control })

  const handleAddCharacter = () => {
    const characters = fields as any as Array<FindCharacterDTO & { id: string }>
    const character = subForm.getValues()

    if (
      characters.some(
        (f) =>
          f.name === character.name && f.realm === character.realm && f.region === character.region
      )
    ) {
      subForm.setError("name", { message: "Character already added." })
    } else {
      append({ ...subForm.getValues() })
    }
  }

  const handleRemoveCharacter = (index: number) => remove(index)

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
            <Select id="region" label="Region" items={RegionItems} form={subForm} />
            <Combobox id="realm" label="Realm" items={Realms} form={subForm} />
            <Textfield id="name" label="Name" form={subForm} />
          </div>
        </div>

        <div className="flex justify-end bg-surface-600 px-7 py-5">
          <Button type="button" onClick={subForm.handleSubmit(handleAddCharacter)}>
            Add Character
          </Button>
        </div>
      </div>

      <div>
        {fields.map(({ id: key, ...character }, index) => {
          return (
            <div key={key}>
              <input type="hidden" {...form.register(`${id}.${index}.region`)} />
              <input type="hidden" {...form.register(`${id}.${index}.realm`)} />
              <input type="hidden" {...form.register(`${id}.${index}.name`)} />
              <CharacterPreview
                character={character as FindCharacterDTO}
                onRemove={() => handleRemoveCharacter(index)}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
