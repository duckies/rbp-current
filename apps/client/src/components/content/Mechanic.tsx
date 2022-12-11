import clsx from "clsx"
import { WarcraftIcon } from "components/content/WarcraftIcon"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import { Link } from "components/Link"
import { motion } from "framer-motion"
import { useWowhead } from "hooks/useWowhead"
import type { ReactNode } from "react"
import { useState } from "react"

type MechanicProps = {
  name: string
  id: number
  caption?: string
  link: string
  children: ReactNode
}

export function Mechanic({ id, name, caption, children }: MechanicProps) {
  const [isOpen, setIsOpen] = useState(false)
  useWowhead()

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="prose relative my-4 max-w-none rounded-lg bg-surface-600 hover:bg-surface">
      <div className="flex gap-4 rounded-md p-4 hover:cursor-pointer" onClick={toggle}>
        <div className="not-prose flex items-center rounded-md">
          <Link
            to={`https://wowhead.com/spell=${id}`}
            className="hide-wowhead"
            style="plain"
            externalIcon={false}
          >
            <WarcraftIcon
              className="shadow-xl [box-shadow:0_0_0_1px_rgb(250_214_122)]"
              id={id}
              size={45}
            />
          </Link>
        </div>
        <div className="flex flex-grow flex-col justify-between font-medium ">
          <span className="text-xl leading-6">{name}</span>
          {caption && <span className="text-base leading-[1] text-yellow-400">{caption}</span>}
        </div>
        <div className={clsx("p-3 transition-transform duration-[300]", isOpen && "rotate-180")}>
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
          className={clsx("relative overflow-hidden border-t border-gray-800")}
          aria-expanded={isOpen}
        >
          {children}
        </motion.div>
      </div>
    </div>
  )
}
