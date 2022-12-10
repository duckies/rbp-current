import clsx from "clsx"
import { WarcraftIcon } from "components/content/WarcraftIcon"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import { Link } from "components/Link"
import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { useRef, useState } from "react"

type MechanicProps = {
  name: string
  id: number
  caption?: string
  link: string
  children: ReactNode
}

export function Mechanic({ id, name, caption, link, children }: MechanicProps) {
  const [open, setOpen] = useState(false)
  const wasOpened = useRef(false)

  const toggle = () => {
    setOpen(!open)

    if (!wasOpened.current) {
      window.$WowheadPower?.refreshLinks()
      wasOpened.current = true
    }
  }

  return (
    <div className="hover:bg-surface prose relative my-4 max-w-none rounded-lg bg-surface-600">
      <div className="flex gap-4 rounded-md p-4 hover:cursor-pointer" onClick={toggle}>
        <div className="not-prose rounded-md">
          <Link to={`https://wowhead.com/spell=${id}`} data-wh-rename-link="false">
            <WarcraftIcon
              className="rounded-sm border-2 border-surface-900 shadow-xl"
              id={id}
              size={45}
            />
          </Link>
        </div>
        <div className="flex flex-grow flex-col font-medium ">
          <span className="text-xl leading-6">{name}</span>
          {caption && <span className="text-base text-yellow-400">{caption}</span>}
        </div>
        <div className={clsx("p-3 transition-transform duration-[300]", open && "rotate-180")}>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </div>

      <motion.div
        initial={false}
        animate={open ? "open" : "closed"}
        variants={{
          closed: {
            opacity: 0,
            height: 0,
            transitionEnd: {
              display: "none",
            },
            transition: {
              ease: "linear",
            },
          },
          open: {
            display: "block",
            opacity: 1,
            height: "auto",
          },
        }}
        className={clsx(
          "relative overflow-hidden border-t border-gray-800 px-6 py-2",
          !open && "hidden"
        )}
        aria-expanded={open}
      >
        {children}
      </motion.div>
    </div>
  )
}
