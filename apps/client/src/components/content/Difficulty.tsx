import { RadioGroup } from "@radix-ui/react-dropdown-menu"
import Button from "components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  ItemIndicator,
  RadioItem,
} from "components/Dropdown"
import CheckIcon from "components/icons/CheckIcon"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import { useRouter } from "next/router"
import type { FC, ReactNode } from "react"
import type { DifficultyLevel } from "stores/difficulty"
import { DifficultyLevels, useDifficulty } from "stores/difficulty"

type DifficultyDropdownProps = {
  className?: string
}

export const DifficultyDropdown: FC<DifficultyDropdownProps> = ({ className }) => {
  const router = useRouter()
  const { level, setLevel } = useDifficulty()

  const onChange = (level: DifficultyLevel) => {
    setLevel(level)
    const params = router.query.params as string[]

    if (DifficultyLevels.includes(params[params.length - 1] as any)) {
      router.push(`/${params.slice(0, -1).join("/")}/${level}`, undefined, { shallow: true })
    } else {
      router.push(`/${params.join("/")}/${level}`, undefined, { shallow: true })
    }
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {level.charAt(0).toUpperCase() + level.slice(1)}
            <ChevronDownIcon className="ml-1.5 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5} collisionPadding={5}>
          <RadioGroup value={level} onValueChange={(level) => onChange(level as any)}>
            <RadioItem value="normal">
              <ItemIndicator>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
              </ItemIndicator>
              Normal
            </RadioItem>
            <RadioItem value="heroic">
              <ItemIndicator>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
              </ItemIndicator>
              Heroic
            </RadioItem>
            <RadioItem value="mythic">
              <ItemIndicator>
                <CheckIcon className="mr-2 inline-block h-4 w-4" />
              </ItemIndicator>
              Mythic
            </RadioItem>
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

type DifficultyProps = {
  normal?: boolean
  heroic?: boolean
  mythic?: boolean
  children: ReactNode
}

export const Difficulty: FC<DifficultyProps> = ({ normal, heroic, mythic, children }) => {
  const { level } = useDifficulty()

  const isVisible =
    (level === "normal" && normal) ||
    (level === "heroic" && heroic) ||
    (level === "mythic" && mythic)

  if (isVisible) {
    return <>{children}</>
  }

  return null
}
