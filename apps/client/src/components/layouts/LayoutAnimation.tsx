"use client"

import type { Transition, Variants } from "framer-motion"
import { AnimatePresence, LazyMotion, m } from "framer-motion"
import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

const variants: Variants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

const transition: Transition = {
  duration: 0.25,
}

type LayoutAnimationProps = {
  children: ReactNode
}

async function loadFeatures() {
  const res = await import("utils/framer/dom-animation")
  return res.default
}

export function LayoutAnimation({ children }: LayoutAnimationProps) {
  const path = usePathname()

  return (
    <AnimatePresence initial={false}>
      <LazyMotion strict features={loadFeatures}>
        <m.div
          key={path}
          animate="in"
          initial="out"
          exit="out"
          variants={variants}
          transition={transition}
        >
          {children}
        </m.div>
      </LazyMotion>
    </AnimatePresence>
  )
}
