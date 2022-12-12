import type { StaticImageData } from "next/image"
import DefaultBackground from "public/images/noise-bg.png"
import type { ReactNode } from "react"
import { createContext, useContext, useMemo, useState } from "react"

type Background = string | StaticImageData

export type BackgroundContextState = {
  background: Background
  setBackground: (src: string | StaticImageData) => void
}

const BackgroundContext = createContext<BackgroundContextState | null>(null)

type BackgroundProviderProps = {
  src?: Background
  children: ReactNode
}

export const BackgroundProvider = ({
  src = DefaultBackground,
  children,
}: BackgroundProviderProps) => {
  const [background, setBackground] = useState<Background>(src)

  const value = useMemo(
    () => ({
      background,
      setBackground,
    }),
    [background, setBackground]
  )

  return <BackgroundContext.Provider value={value}>{children}</BackgroundContext.Provider>
}

export const useBackground = () => {
  const context = useContext(BackgroundContext)

  if (!context) {
    throw new Error("useBackground must be used within a BackgroundProvider")
  }

  return context
}
