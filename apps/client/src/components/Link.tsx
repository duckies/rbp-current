import clsx from "clsx"
import NextLink from "next/link"
import { useRouter } from "next/router"
import type { DOMProps } from "types/shared"

export type LinkProps = DOMProps<"a"> & {
  to?: string
  children?: React.ReactNode
  className?: string
  passHref?: boolean
}

export function Link({ to, className, children, ...props }: LinkProps) {
  const router = useRouter()
  const isExternal = to && (to.startsWith("http") || to.startsWith("mailto:"))
  const isActive = to && !isExternal && router.asPath === to
  const classes = clsx("link", className)

  if (to && !isExternal) {
    return (
      <NextLink href={to} className={classes} {...props} data-active={isActive}>
        {children}
      </NextLink>
    )
  }

  return (
    <a href={to} rel="noreferrer noopener" target="_blank" className={classes} {...props}>
      {children}
    </a>
  )
}
