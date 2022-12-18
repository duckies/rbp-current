import type { LazyProps } from "framer-motion"
import { domAnimation, LazyMotion as Motion } from "framer-motion"
import type { FC } from "react"

export const LazyDOMMotion: FC<Omit<LazyProps, "features" | "strict">> = () => {
  return <Motion features={domAnimation} strict />
}
