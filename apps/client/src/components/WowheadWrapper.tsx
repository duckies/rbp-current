"use client"

import { useWowhead } from "hooks/useWowhead"

type WowheadWrapperProps = {
  children: React.ReactNode
}

export function WowheadWrapper({ children }: WowheadWrapperProps) {
  useWowhead()

  return <>{children}</>
}
