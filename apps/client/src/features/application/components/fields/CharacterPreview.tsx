import { RealmMap } from "@rbp/battle.net/constants"
import type { FindCharacterDTO } from "@rbp/server"
import Button from "components/Button"
import { ArrowUpRight } from "components/icons/ArrowUpRight"
import { CloseIcon } from "components/icons/Close"
import { useCharacterLookup } from "features/characters/queries"
import Image from "next/image"

export type CharacterPreviewProps = {
  character: FindCharacterDTO
  removable?: boolean
  onRemove?: () => void
}

export function CharacterPreview({ character, onRemove }: CharacterPreviewProps) {
  const { data, status } = useCharacterLookup(character)

  if (status === "error" && !data) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h2>Oops lmfao</h2>
      </div>
    )
  }

  if (status === "loading" && !data) {
    return (
      <div className="my-4 flex flex-wrap justify-between gap-2.5 rounded-md bg-surface p-6">
        <div className="flex animate-pulse space-x-4">
          <div className="h-[80px] w-[80px] rounded-full bg-gray-300" />

          <div className="flex-1 space-y-6">
            <div className="h-4 rounded bg-gray-300" />
            <div className="h-4 rounded bg-gray-300" />
            <div className="h-4 rounded bg-gray-300" />
            <div className="h-4 rounded bg-gray-300" />
          </div>
        </div>
      </div>
    )
  }

  const CharacterBasics = data.summary ? (
    <div className="flex flex-col justify-center">
      <h3 className={`text-lg font-semibold`}>{data.name}</h3>
      <p>{Object.entries(RealmMap).find(([, v]) => v === data.realm)?.[0]}</p>
      <p>
        {data.summary.spec ? `${data.summary.spec.name} ` : ""}
        {data.summary.class.name}
      </p>
      <div>
        <div></div>
      </div>
    </div>
  ) : (
    <div>
      <h3>{data.name}</h3>
      <p>{data.realm}</p>
      <p>Unknown</p>
    </div>
  )

  const CharacterProgression = data.progression?.summary ? (
    <div>
      <h3 className="text-lg font-semibold">
        Progression <ArrowUpRight className="inline-flex h-full w-auto" />
      </h3>
      {Object.entries(data.progression.summary).map(([raid]) => (
        <div key={raid}>{raid}</div>
      ))}
      {/* <p>{data.progression.summary.map((raid) => raid.name).join(", ")}</p> */}
    </div>
  ) : (
    <div>
      <h3>No Progression Data</h3>
    </div>
  )

  return (
    <>
      <div
        className={`relative my-5 flex justify-center gap-5 rounded-md p-5 ${
          data.summary ? `bg-class-${data.summary.class.id}/70` : `bg-surface-300`
        }`}
      >
        {onRemove && (
          <div className="absolute top-0 right-0 p-3">
            <Button variant="icon" className="hover:text-gray-200" type="button" onClick={onRemove}>
              <CloseIcon className="h-7 w-7" />
            </Button>
          </div>
        )}
        <Image
          className="flex self-center rounded-full"
          src={data.avatar}
          width="84"
          height="84"
          alt="Character Avatar"
        />
        {CharacterBasics}
        {CharacterProgression}
      </div>
    </>
  )
}
