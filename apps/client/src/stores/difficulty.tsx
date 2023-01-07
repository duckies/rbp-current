import { isArray } from "@rbp/shared"
import { useRouter } from "next/router"
import type { FC, ReactNode } from "react"
import { createContext, useContext, useMemo, useState } from "react"

export const DifficultyLevels = ["normal", "heroic", "mythic"] as const
export type DifficultyLevel = "normal" | "heroic" | "mythic"

type DifficultyContextState = {
  level: DifficultyLevel
  setLevel: (level: DifficultyLevel) => void
}

const DifficultyContext = createContext<DifficultyContextState | null>(null)

type DifficultProviderProps = {
  children: ReactNode
  defaultLevel?: DifficultyLevel
}

export const DifficultyProvider: FC<DifficultProviderProps> = ({ children }) => {
  const router = useRouter()
  const defaultLevel =
    isArray(router.query.params) &&
    DifficultyLevels.includes(router.query.params[router.query.params.length - 1] as any)
      ? (router.query.params[router.query.params.length - 1] as DifficultyLevel)
      : "heroic"

  const [level, setLevel] = useState<DifficultyLevel>(defaultLevel)

  const value = useMemo(
    () => ({
      level,
      setLevel,
    }),
    [level, setLevel]
  )

  return <DifficultyContext.Provider value={value}>{children}</DifficultyContext.Provider>
}

export const useDifficulty = () => {
  const context = useContext(DifficultyContext)

  if (!context) {
    throw new Error("useDifficulty must be used within a DifficultyProvider")
  }

  return context
}
