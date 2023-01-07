import clsx from "clsx"
import type { LinkProps } from "components/Link"
import { Link } from "components/Link"
import { useDifficulty } from "stores/difficulty"

type ProseLinkProps = Omit<LinkProps, "style"> & {
  icon?: boolean
  styleVariant: LinkProps["style"]
}

export function ProseLink({
  href,
  className,
  icon = true,
  styleVariant,
  ...props
}: ProseLinkProps) {
  const isWowheadLink = href?.includes("wowhead.com/spell=")
  const { level } = useDifficulty()

  if (isWowheadLink) {
    const url = new URL(href!)
    const params = url.searchParams

    if (level === "mythic") {
      params.delete("dd")
    } else {
      params.set("dd", level === "heroic" ? "15" : "14")
    }

    href = url.toString()
  }

  return (
    <Link
      className={clsx(
        "text-yellow-400 hover:text-yellow-500",
        isWowheadLink && icon ? "with-wowhead-icon" : "hide-wowhead-icon",
        className
      )}
      externalIcon={false}
      data-wh-icon-size="small"
      href={href}
      style={styleVariant}
      {...props}
    />
  )
}
