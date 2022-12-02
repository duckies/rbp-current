import NextLink from "next/link"
import { useRouter } from "next/router"
import type { DOMProps } from "types/shared"

export type LinkProps = DOMProps<"a"> & {
  to: string
  children?: React.ReactNode
  className?: string
  passHref?: boolean
}

export function Link({ to, className, children, ...props }: LinkProps) {
  const router = useRouter()
  const isExternal = to.startsWith("http") || to.startsWith("mailto:")
  const isActive = !isExternal && router.asPath === to

  // if (isValidElement<any>(children)) {
  //   children = cloneElement(children, { isActive })
  // }

  if (!isExternal) {
    return (
      <NextLink href={to} className={className} {...props}>
        {children}
      </NextLink>
    )
  }

  return (
    <a href={to} rel="noreferrer noopener" target="_blank" className={className} {...props}>
      {children}
    </a>
  )
}
