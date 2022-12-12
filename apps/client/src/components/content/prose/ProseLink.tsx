import clsx from "clsx"
import type { LinkProps } from "components/Link"
import { Link } from "components/Link"

export function ProseLink(props: Omit<LinkProps, "style">) {
  const isWowheadLink = props.href?.includes("wowhead.com/spell=")

  return (
    <Link
      className={clsx(
        "text-yellow-400 hover:text-yellow-500",
        isWowheadLink && "with-wowhead-icon"
      )}
      externalIcon={false}
      data-wh-icon-size="small"
      {...props}
    />
  )
}
