import type { NavigationMenuLinkProps } from "@radix-ui/react-navigation-menu"
import { Link as RadixNavLink } from "@radix-ui/react-navigation-menu"
import type { LinkProps } from "components/Link"
import NextLink from "next/link"
import { useRouter } from "next/router"
import css from "./menu.module.scss"

export type NavigationLinkProps = LinkProps & NavigationMenuLinkProps

export const Link = ({ to, ...props }: NavigationLinkProps) => {
  const router = useRouter()
  const isActive = router.asPath === to

  return (
    <RadixNavLink asChild active={isActive}>
      <NextLink href={to} className={css.link} {...props} />
    </RadixNavLink>
  )
}
