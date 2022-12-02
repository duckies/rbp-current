import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import * as Radix from "@radix-ui/react-navigation-menu"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import { Link } from "components/navigation/link"
import css from "./menu.module.scss"

export type NavigationMenuRootProps = NavigationMenuProps & {
  children: React.ReactNode
}

export function NavigationMenu({ children }: NavigationMenuRootProps) {
  return (
    <Radix.Root className={css.root}>
      {children}
      <div className={css.viewportPosition}>
        <Radix.Viewport className={css.viewport} />
      </div>
    </Radix.Root>
  )
}

export type NavigationMenuListProps = {
  children: React.ReactNode
}

function List({ children }: NavigationMenuListProps) {
  return <Radix.List className={css.list}>{children}</Radix.List>
}

export type NavigationMenuItemProps = {
  children: React.ReactNode
}

function Item({ children }: NavigationMenuItemProps) {
  return <Radix.Item>{children}</Radix.Item>
}

export type NavigationDropdownProps = {
  label: string
  children: React.ReactNode
}

export type NavigationTriggerProps = {
  children: React.ReactNode
}

function Trigger({ children }: NavigationTriggerProps) {
  return (
    <Radix.Trigger className={css.trigger}>
      {children} <ChevronDownIcon className={css.triggerIcon} aria-hidden />
    </Radix.Trigger>
  )
}

export type NavigationContentProps = {
  children: React.ReactNode
}

function Content({ children }: NavigationContentProps) {
  return <Radix.Content className={css.content}>{children}</Radix.Content>
}

function Indicator() {
  return <Radix.Indicator className={css.indicator} />
}

NavigationMenu.List = List
NavigationMenu.Item = Item
NavigationMenu.Trigger = Trigger
NavigationMenu.Content = Content
NavigationMenu.Link = Link
NavigationMenu.Indicator = Indicator
