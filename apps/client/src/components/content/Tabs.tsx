import clsx from "clsx"
import type { FC, ReactNode } from "react"
import { isValidElement, useState } from "react"
import type { DOMProps } from "types/shared"

type TabsProps = DOMProps<"div"> & {
  children: ReactNode[]
}

export const getParsedTabs = (children: ReactNode[]) => {
  const tabs: Array<{ label: string; index: number }> = []

  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    if (isValidElement(child)) {
      tabs.push({
        label: child.props?.label || i + 1,
        index: i,
      })
    }
  }

  return tabs
}

export const Tabs: FC<TabsProps> & { Tab: typeof Tab } = ({ children }) => {
  const [tabIndex, setTabIndex] = useState(0)
  const tabs = getParsedTabs(children)

  const onSetTab = (index: number) => {
    setTabIndex(index)
  }

  return (
    <div className="my-4 rounded-lg bg-surface-600 p-4">
      <nav className="not-prose mb-3 bg-surface">
        <ul className="flex gap-3">
          {tabs.map(({ label, index }) => {
            const isActive = index === tabIndex

            return (
              <li
                className={clsx(
                  "list-none rounded-lg p-2 text-sm ",
                  isActive ? "bg-surface-300" : "cursor-pointer"
                )}
                key={index}
                onClick={() => onSetTab(index)}
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

      <div>{children[tabIndex]}</div>
    </div>
  )
}

type TabProps = {
  label?: string
  children: ReactNode
  onClick?: () => void
}

export const Tab: FC<TabProps> = ({ children }) => <>{children}</>

Tabs.Tab = Tab
