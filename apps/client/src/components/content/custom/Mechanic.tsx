"use client"

import { WarcraftIcon } from "components/content/custom/WarcraftIcon"
import { ProseLink } from "components/content/prose/ProseLink"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import { motion } from "framer-motion"
import { useWowhead } from "hooks/useWowhead"
import { useState } from "react"
import { cn } from "utils/cn"

type MechanicProps = {
  name: string
  id: number
  caption?: string
  pill?: string
  link: string
  children: React.ReactNode
}

export function Mechanic({ id, name, caption, pill, children }: MechanicProps) {
  const [isOpen, setIsOpen] = useState(false)
  useWowhead()

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative my-4 max-w-none rounded-lg bg-surface-600 shadow-lg hover:bg-surface">
      <div className="not-prose flex gap-4 rounded-md p-4 hover:cursor-pointer" onClick={toggle}>
        <div className="flex shrink-0 items-center rounded-md">
          <ProseLink href={`https://wowhead.com/spell=${id}`} styleVariant="plain" icon={false}>
            <WarcraftIcon
              className="shadow-xl [box-shadow:0_0_0_1px_rgb(250_214_122)]"
              id={id}
              size={45}
            />
          </ProseLink>
        </div>
        <div className="flex flex-grow flex-col justify-between font-medium ">
          <span className="text-xl leading-6">{name}</span>
          {caption && <span className="text-base leading-[1] text-yellow-400">{caption}</span>}
        </div>

        {pill && (
          <div className="flex items-center">
            <span className="flex h-8 items-center rounded-full bg-yellow-400 py-2 px-4 text-sm font-medium text-black shadow-md">
              {pill}
            </span>
          </div>
        )}

        <div
          className={cn(
            "flex items-center p-3 transition-transform duration-[300]",
            isOpen && "rotate-180"
          )}
        >
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>

      <div className="px-5">
        <motion.div
          initial={false}
          animate={isOpen ? "expanded" : "collapsed"}
          variants={{
            collapsed: {
              opacity: 0,
              height: 0,
              transitionEnd: {
                display: "none",
              },
            },
            expanded: {
              display: "block",
              opacity: 1,
              height: "auto",
            },
          }}
          transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
          className={cn("relative overflow-hidden border-t border-gray-800")}
          aria-expanded={isOpen}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
