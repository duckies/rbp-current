import { FieldError } from "components/forms/shared/FieldError"
import { AddCharacterDialog } from "features/application/components/AddCharacterDialog"
import { CharacterList, CharacterListItem } from "features/application/components/CharacterList"
import type { CharacterDTO, ControlledFieldProps } from "features/application/types"
import { useFieldArray } from "react-hook-form"

export type CharacterPickerProps = ControlledFieldProps & {}

export function CharacterPicker({ id, register, control, error, rules }: CharacterPickerProps) {
  const { fields, append, remove, update } = useFieldArray<{ [id: string]: CharacterDTO[] }>({
    name: id,
    control,
    rules,
  })

  const handleAddCharacter = (character: CharacterDTO) => {
    // Set the first added character as the main character.
    append({ ...character, main: fields.length === 0 })
  }

  const handleRemoveCharacter = (index: number) => remove(index)

  const handleSetCharacterMain = (index: number) => {
    for (let i = 0; i < fields.length; i++) {
      update(i, { ...fields[i], main: i === index })
    }
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

          <div className="mb-4 flex justify-center rounded-xl bg-surface-600 p-6">
            <AddCharacterDialog onAdd={handleAddCharacter} />
          </div>

          <CharacterList>
            {fields.map(({ id: key, ...character }, index) => {
              return (
                <div key={key}>
                  <input type="hidden" {...register(`${id}.${index}.region`)} />
                  <input type="hidden" {...register(`${id}.${index}.realm`)} />
                  <input type="hidden" {...register(`${id}.${index}.name`)} />
                  <CharacterListItem
                    character={character}
                    onRemove={() => handleRemoveCharacter(index)}
                    onSetMain={() => handleSetCharacterMain(index)}
                  />
                </div>
              )
            })}
          </CharacterList>
        </div>

        <div className="flex justify-between bg-surface-600 px-7 py-5">
          <div>{error && <FieldError>{error}</FieldError>}</div>
        </div>
      </div>
    </>
  )
}
