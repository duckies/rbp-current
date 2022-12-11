import type { LinkProps } from "components/Link"
import { Link } from "components/Link"

export function ProseLink(props: Omit<LinkProps, "style">) {
  return (
    <Link
      className="text-yellow-400 hover:text-yellow-500"
      externalIcon={false}
      data-wh-icon-size="small"
      {...props}
    />
  )
}
