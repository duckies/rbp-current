import Image from "next/image"
import type { ComponentProps } from "react"

type BackgroundProps = {
  background: ComponentProps<typeof Image>["src"]
}

export function Background({ background }: BackgroundProps) {
  return (
    <div className="absolute inset-0 -z-10 h-[440px] overflow-hidden lg:h-[750px]">
      <div className="hero-gradient absolute inset-[-50vw] z-[10] animate-[5s_infinite_spin] opacity-40" />
      <Image className="h-full w-full object-cover" src={background} fill alt="" priority />
      <div className="absolute inset-0 z-[20] bg-gradient-to-t from-surface-900 to-surface-900/[65%]" />
    </div>
  )
}
