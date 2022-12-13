import type { FC, ReactNode } from "react"
import { createContext, useContext, useMemo, useState } from "react"

type DifficultyLevel = "normal" | "heroic" | "mythic"

type DifficultyContextState = {
  level: DifficultyLevel
  setLevel: (level: DifficultyLevel) => void
}

const DifficultyContext = createContext<DifficultyContextState | null>(null)

type DifficultProviderProps = {
  children: ReactNode
}

export const DifficultyProvider: FC<DifficultProviderProps> = ({ children }) => {
  const [level, setLevel] = useState<DifficultyLevel>("heroic")

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
