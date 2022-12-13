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
import type { FC } from "react"
import { useDifficulty } from "stores/difficulty"

type DifficultyProps = {
  level: "normal" | "heroic" | "mythic"
  className?: string
}

export const Difficulty: FC<DifficultyProps> = ({ className }) => {
  const { level, setLevel } = useDifficulty()

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
          <RadioGroup value={level} onValueChange={(level) => setLevel(level as any)}>
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
