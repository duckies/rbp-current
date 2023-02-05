"use client"

import { DropdownMenuItemIndicator, RadioGroup } from "@radix-ui/react-dropdown-menu"
import { capitalize } from "@rbp/shared"
import Button from "components/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "components/Dropdown"
import { CheckIcon } from "components/icons/CheckIcon"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "utils/cn"

const levels = ["normal", "heroic", "mythic"]

type DifficultyDropdownProps = {
  className?: string
  available: string[]
}

function getPathDifficulty(path: string | null) {
  if (path) {
    const parts = path.split("/")
    const lastPart: any = parts[parts.length - 1]

    if (["normal", "heroic", "mythic"].includes(lastPart)) {
      return lastPart
    }
  }

  return null
}

export function DifficultyDropdown({ className, available }: DifficultyDropdownProps) {
  const path = usePathname()
  const router = useRouter()
  const level = getPathDifficulty(path) || "heroic"

  const onChange = (level: string) => {
    if (!path || !available.includes(level)) return

    const params = path.split("/")
    const currentDifficulty = getPathDifficulty(path)

    if (currentDifficulty) {
      params.pop()
    }

    params.push(level)
    router.push(params.join("/"))
  }

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {capitalize(level)}
            <ChevronDownIcon className="ml-1.5 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={5} collisionPadding={5}>
          <RadioGroup value={level} onValueChange={(level) => onChange(level as any)}>
            {levels.map((level) => {
              const disabled = !available.includes(level)
              return (
                <DropdownMenuRadioItem key={level} value={level} disabled={disabled}>
                  <DropdownMenuItemIndicator>
                    <CheckIcon className={cn("mr-2 inline-block h-4 w-4")} />
                  </DropdownMenuItemIndicator>
                  <span className={cn(disabled && "select-none text-gray-500")}>
                    {capitalize(level)}
                  </span>
                </DropdownMenuRadioItem>
              )
            })}
          </RadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
