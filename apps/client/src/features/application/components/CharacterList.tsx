import clsx from "clsx"
import { IconButton } from "components/IconButton"
import { CloseIcon } from "components/icons/CloseIcon"
import { StarIcon } from "components/icons/StarIcon"
import { Link } from "components/Link"
import type { CharacterDTO } from "features/application/types"
import { useCharacterLookup } from "features/characters/queries"
import Image from "next/image"

type CharacterListProps = {
  children: React.ReactNode
}

export function CharacterList({ children }: CharacterListProps) {
  return (
    <div>
      <ul className="flex flex-1 flex-col gap-2">{children}</ul>
    </div>
  )
}

type CharacterListItemProps = {
  character: CharacterDTO
  onRemove?: () => void
  onSetMain?: () => void
}

export function CharacterListItem({
  character: { main, ...character },
  onRemove,
  onSetMain,
}: CharacterListItemProps) {
  const { data, status } = useCharacterLookup(character)

  if (!data) {
    return (
      <li>
        <div>Loading...</div>
      </li>
    )
  }

  return (
    <li>
      <div
        className={clsx(
          "flex justify-between gap-3 rounded-md border-2 px-4 py-2",
          data.summary?.class
            ? `bg-class-${data.summary.class.id}/30 border-class-${data.summary.class.id}`
            : ""
        )}
      >
        <div className="flex items-center gap-4 [text-shadow:0_1px_2px_#000]">
          <Image
            src={data.avatar}
            className={clsx(
              "text-shadow-lg rounded-full border-2",
              data.summary?.class && `border-class-${data.summary.class.id}`
            )}
            height="45"
            width="45"
            alt="Character Avatar"
          />

          <div>
            <p className="text-lg font-medium">{data.name}</p>
            <p>
              {data.summary?.race.name} {data.summary?.class.name}
            </p>
          </div>

          <div>
            <p className="text-lg  font-medium text-yellow">
              <Link
                href={`https://raider.io/characters/${data.region}/${data.realm}/${data.name}`}
                externalIcon={false}
              >
                Mythic+ Rating
              </Link>
            </p>
            <span className="text-center">
              {data.keystones?.rating ? Math.round(data.keystones.rating) : "No rating found."}
            </span>
          </div>

          <div>
            <p className="text-lg font-medium text-yellow">Progression</p>

            <p className="text-center">
              {data.progression &&
                Object.entries(data.progression?.summary).map(([instance, progress]) => {
                  const highest =
                    ("Mythic" in progress && "Mythic") ||
                    ("Heroic" in progress && "Heroic") ||
                    "Normal"

                  return (
                    <div key={instance}>
                      <span>{instance}</span> —{" "}
                      <span className="inline-flex rounded-lg bg-surface/20 px-2 py-1">
                        {progress[highest]} {highest.charAt(0)}
                      </span>
                    </div>
                  )
                })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onSetMain && (
            <IconButton rounded={false} size="medium" onClick={onSetMain}>
              <StarIcon className="h-full w-full" filled={main} />
            </IconButton>
          )}

          {onRemove && (
            <IconButton rounded={false} size="medium" onClick={onRemove}>
              <CloseIcon className="h-full w-full" />
            </IconButton>
          )}
        </div>
      </div>
    </li>
  )
}
