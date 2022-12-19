import clsx from "clsx"
import type { Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import { useWowhead } from "hooks/useWowhead"
import type { FC, ReactElement, ReactNode } from "react"
import { isValidElement, useState } from "react"
import type { DOMProps } from "types/shared"

type TabsProps = DOMProps<"div"> & {
  children: ReactNode[]
  header?: boolean
}

export const getParsedTabs = (children: ReactNode[]) => {
  const tabs: Array<{ label: string; component: ReactElement }> = []

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

// const swipeConfidenceThreshold = 10000
// const swipePower = (offset: number, velocity: number) => {
//   return Math.abs(offset) * velocity
// }

export const Tabs: FC<TabsProps> = ({ header, children }) => {
  const [[page, direction], setPage] = useState([0, 0])
  const tabs = getParsedTabs(children)

  useWowhead()

  const variants: Variants = {
    enter: (direction: number) => {
      return {
        position: "absolute",
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      position: "relative",
    },
    exit: (direction: number) => {
      return {
        position: "absolute",
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
      }
    },
  }

  // const paginate = (newDirection: number) => {
  //   if (page + newDirection < 0 || page + newDirection > tabs.length - 1) return
  //   setPage([page + newDirection, newDirection])
  // }

  const TabContent = (
    <AnimatePresence initial={false} custom={direction}>
      <motion.div
        key={page}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
        // drag="x"
        // dragConstraints={{ left: 0, right: 0 }}
        // dragElastic={1}
        // onDragEnd={(e, { offset, velocity }) => {
        //   const swipe = swipePower(offset.x, velocity.x)

        //   if (swipe < -swipeConfidenceThreshold) {
        //     paginate(1)
        //   } else if (swipe > swipeConfidenceThreshold) {
        //     paginate(-1)
        //   }
        // }}
      >
        {tabs[page].component}
      </motion.div>
    </AnimatePresence>
  )

  return (
    <>
      <div className="tabs group relative my-4 overflow-hidden rounded-lg bg-surface-600 p-4">
        <nav className={clsx("not-prose", header ? "" : "mb-3")}>
          <ul className="flex gap-3">
            {tabs.map(({ label }, index) => {
              const isActive = index === page

              return (
                <li
                  className={clsx(
                    "list-none rounded-md p-2 text-base font-medium",
                    isActive ? "bg-yellow-300  text-black" : "cursor-pointer"
                  )}
                  key={index}
                  onClick={() => setPage([index, index - page])}
                >
                  {label}
                </li>
              )
            })}
          </ul>
          <span
            className={clsx(
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
  children: ReactNode
  onClick?: () => void
}

export const Tab: FC<TabProps> = ({ children }) => <>{children}</>
