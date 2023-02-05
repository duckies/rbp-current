"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useWowhead } from "hooks/useWowhead"
import { isValidElement, useState } from "react"
import { cn } from "utils/cn"

export function getParsedTabs(children: React.ReactNode[]) {
  const tabs: Array<{ label: string; component: React.ReactElement }> = []

  for (const child of children) {
    if (isValidElement(child)) {
      tabs.push({
        label: child.props?.label || tabs.length + 1,
        component: child,
      })
    }
  }

  return tabs
}

type TabsProps = {
  children: React.ReactNode[]
  header?: boolean
}

export function Tabs({ header, children }: TabsProps) {
  const [page, setPage] = useState(0)
  const tabs = getParsedTabs(children)

  useWowhead()

  const TabContent = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          opacity: { duration: 0.25 },
        }}
      >
        {tabs[page].component}
      </motion.div>
    </AnimatePresence>
  )

  return (
    <>
      <div className="tabs group relative my-4 overflow-hidden rounded-lg bg-surface-600 p-4">
        <nav className={cn("not-prose", !header && "mb-3")}>
          <ul className="flex flex-wrap justify-center gap-3 md:justify-start">
            {tabs.map(({ label }, index) => {
              const isActive = index === page

              return (
                <li
                  className={cn(
                    "list-none rounded-md p-2 text-base font-medium",
                    isActive ? "bg-yellow-300  text-black" : "cursor-pointer"
                  )}
                  key={index}
                  onClick={() => setPage(index)}
                >
                  {label}
                </li>
              )
            })}
          </ul>
          <span
            className={cn(
              "indicator absolute top-0 bottom-0 left-0 my-auto overflow-hidden rounded-lg bg-surface-400 shadow-2xl transition"
            )}
          ></span>
        </nav>

        {!header && TabContent}
      </div>

      {header && TabContent}
    </>
  )
}

type TabProps = {
  label?: string
  children: React.ReactNode
  onClick?: () => void
}

export function Tab({ children }: TabProps) {
  return <>{children}</>
}
