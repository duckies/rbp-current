import type { NavigationMenuProps } from "@radix-ui/react-navigation-menu"
import * as Radix from "@radix-ui/react-navigation-menu"
import clsx from "clsx"
import { ChevronDownIcon } from "components/icons/ChevronDown"
import type { LinkProps } from "components/Link"
import type { VariantProps } from "cva"
import { cva } from "cva"
import type { ImageProps } from "next/image"
import Image from "next/image"
import NextLink from "next/link"
import { useRouter } from "next/router"
import type { DOMProps } from "types/shared"

type NavigationMenuRootProps = NavigationMenuProps & {
  children: React.ReactNode
}

const viewportCSS = cva([
  "relative mt-[15px] w-full origin-top overflow-hidden rounded-md",
  "bg-surface-800/90 backdrop-blur-sm",
  "h-[var(--radix-navigation-menu-viewport-height)]",
  "shadow-[hsl(206_22%_7%/35%)_0_10px_38px_-10px,hsl(206_22%_7%/20%)_0_10px_20px_-15px]",
  "transition-[width,height] duration-300 ease-[ease]",
  "[&[data-state=open]]:animate-[scale-in_200ms_ease]",
  "[&[data-state=closed]]:animate-[scale-out_200ms_ease]",
  "sm:w-[var(--radix-navigation-menu-viewport-width)]",
])()

/**
 * Navigation Menu Root
 */
export function NavigationMenu({ children }: NavigationMenuRootProps) {
  return (
    <Radix.Root className="relative flex w-full justify-center">
      {children}
      <div className="absolute top-full left-0 flex w-full justify-center [perspective:2000px]">
        <Radix.Viewport className={viewportCSS} />
      </div>
    </Radix.Root>
  )
}

type NavigationMenuListProps = {
  children: React.ReactNode
}

/**
 * Navigation Menu List
 *
 * Container for menu items.
 */
function List({ children }: NavigationMenuListProps) {
  return <Radix.List className="m-0 flex list-none justify-center p-2">{children}</Radix.List>
}

type NavigationMenuItemProps = {
  children: React.ReactNode
}

/**
 * Navigation Menu Item
 *
 * Container for `Trigger` dropdowns or `Link` items.
 */
function Item({ children, ...props }: NavigationMenuItemProps) {
  return <Radix.Item {...props}>{children}</Radix.Item>
}

type NavigationTriggerProps = {
  children: React.ReactNode
}

const itemCSS = cva(
  [
    "group",
    "px-3",
    "py-2",
    "outline-none",
    "select-none",
    "font-medium",
    "rounded-md",
    "hover:bg-white/10",
    "focus:ring-2",
    "focus:ring-yellow",
  ],
  {
    variants: {
      type: {
        trigger: "flex items-center justify-between gap-1.5",
        link: "block",
      },
    },
  }
)

/**
 * Navigation Menu Trigger
 *
 * Trigger for navigation menu `Content` dropdowns.
 */
function Trigger({ children }: NavigationTriggerProps) {
  return (
    <Radix.Trigger
      className={itemCSS({ type: "trigger" })}
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative h-3 w-3 transition-transform duration-[250ms] group-[&[data-state=open]]:rotate-[-180deg]"
        aria-hidden
      />
    </Radix.Trigger>
  )
}

type NavigationLinkProps = LinkProps & Radix.NavigationMenuLinkProps

function Link({ to, ...props }: NavigationLinkProps) {
  const router = useRouter()
  const isActive = router.asPath === to

  return (
    <Radix.NavigationMenuLink asChild active={isActive}>
      <NextLink href={to!} className={itemCSS({ type: "link" })} {...props} />
    </Radix.NavigationMenuLink>
  )
}

export type NavigationContentProps = {
  children: React.ReactNode
}

const contentCSS = cva([
  "absolute top-0 left-0 w-full [animation-duration:250ms]",
  "[&[data-motion=from-start]]:[animation-name:enter-from-left]",
  "[&[data-motion=from-end]]:[animation-name:enter-from-right]",
  "[&[data-motion=to-start]]:[animation-name:exit-to-left]",
  "[&[data-motion=to-end]]:[animation-name:exit-to-right]",
  "sm:w-auto",
])

function Content({ children }: NavigationContentProps) {
  return (
    <Radix.Content
      className={contentCSS()}
      onPointerMove={(event) => event.preventDefault()}
      onPointerLeave={(event) => event.preventDefault()}
    >
      {children}
    </Radix.Content>
  )
}

const indicatorCSS = cva([
  "flex items-end justify-center h-[15px] top-full overflow-hidden z-[1]",
  "[transition:width,transform_250ms_ease]",
  "[&[data-state=visible]]:animate-[fade-in_200ms_ease]",
  "[&[data-state=hidden]]:animate-[fade-out_200ms_ease]",
])()

type IndicatorProps = Radix.NavigationMenuIndicatorProps

function Indicator(props: IndicatorProps) {
  return (
    <Radix.Indicator className={indicatorCSS} {...props}>
      <div className="relative top-[60%] h-[15px] w-[15px] rotate-45 rounded-tl-[2px] bg-surface-800/90 backdrop-blur-sm" />
    </Radix.Indicator>
  )
}

export type ContentListProps = DOMProps<"ul"> & VariantProps<typeof listCSS>

const listCSS = cva("grid p-5 m-0 gap-x-3 list-none", {
  variants: {
    style: {
      featured: "w-[580px] grid grid-cols-[0.75fr_1fr] ",
      grid: "w-[400px] grid-flow-row-dense grid-cols-[repeat(2,1fr)]",
    },
  },
})

function ContentList({ style, ...props }: ContentListProps) {
  return <ul className={listCSS({ style })} {...props} />
}

export type ContentListItemProps = DOMProps<"li"> & {
  to: string
  className?: string
  children: React.ReactNode
  title: string
  img?: ImageProps
} & VariantProps<typeof listItemCSS>

const listItemCSS = cva(
  "relative block outline-none select-none p-3 rounded-md hover:bg-surface-400 overflow-hidden",
  {
    variants: {
      style: {
        featured: "p-0 first:row-span-3",
      },
    },
  }
)

const listItemLinkCSS = cva("", {
  variants: {
    style: {
      featured: [
        "flex",
        "justify-center",
        "flex-col",
        "w-full",
        "h-full",
        "bg-[linear-gradient(90deg,hsla(356,60%,53%,0.5)_0%,hsla(313,60%,33%,0.5)_100%)]",
        "rounded-md",
        "p-5",
        "outline-none",
        "select-none",
        "z-10",
      ],
    },
  },
})

export function ContentListItem({
  to,
  className,
  title,
  children,
  style,
  img,
  ...props
}: ContentListItemProps) {
  return (
    <li className={listItemCSS({ style })} {...props}>
      <Link className={clsx(className, listItemLinkCSS({ style }))} to={to}>
        {img && (
          <Image
            className="absolute top-0 left-0 z-[1] w-full object-cover opacity-20"
            {...img}
            alt=""
          />
        )}
        <div className="z-10">
          <div className="mb-1 font-semibold text-yellow-200">{title}</div>
          <p className="text-sm text-gray-50">{children}</p>
        </div>
      </Link>
    </li>
  )
}

NavigationMenu.List = List
NavigationMenu.Item = Item
NavigationMenu.Trigger = Trigger
NavigationMenu.Content = Content
NavigationMenu.ContentList = ContentList
NavigationMenu.ContentListItem = ContentListItem
NavigationMenu.Link = Link
NavigationMenu.Indicator = Indicator
