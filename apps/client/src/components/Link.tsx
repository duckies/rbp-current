import { ArrowUpRight } from "components/icons/ArrowUpRight"
import type { VariantProps } from "cva"
import { cva } from "cva"
import NextLink from "next/link"
import { useRouter } from "next/router"
import type { FC, ReactNode } from "react"
import type { DOMProps } from "types/shared"

export type LinkProps = DOMProps<"a"> &
  VariantProps<typeof linkCSS> & {
    to?: string
    children?: ReactNode
    className?: string
    passHref?: boolean
    externalIcon?: boolean
  }

const linkCSS = cva("", {
  variants: {
    style: {
      plain: "",
      default:
        "inline-block after:ease relative whitespace-nowrap text-yellow-400 no-underline after:absolute after:bottom-[2px] after:left-0 after:h-[1px] after:w-0 after:rounded-full after:bg-yellow after:transition-[width] after:duration-200 hover:text-yellow hover:after:w-full hover:after:ease-out",
    },
  },
  defaultVariants: {
    style: "default",
  },
})

export const Link: FC<LinkProps> = ({
  to,
  style,
  className,
  children,
  externalIcon = true,
  ...props
}) => {
  const router = useRouter()
  const isExternal = to && (to.startsWith("http") || to.startsWith("mailto:"))
  const isActive = to && !isExternal && router.asPath === to
  const classNames = linkCSS({ style, className })

  if (to && !isExternal) {
    return (
      <NextLink href={to} className={classNames} {...props} data-active={isActive}>
        {children}
      </NextLink>
    )
  }

  return (
    <a href={to} rel="noreferrer noopener" target="_blank" className={classNames} {...props}>
      {children} {externalIcon && <ArrowUpRight className="inline h-5 w-5" />}
    </a>
  )
}
