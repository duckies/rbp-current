import clsx from "clsx"
import { Link } from "components/Link"
import type { FC } from "react"
import type { DOMProps } from "types/shared"

export const LinkPreview: FC<DOMProps<"a">> = ({ className, href, ...props }) => {
  return (
    <Link
      className={clsx(
        "after:ease relative whitespace-nowrap text-yellow-400 no-underline after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-yellow after:transition-[width] after:duration-200 hover:text-yellow hover:after:w-full hover:after:ease-out",
        className
      )}
      data-wh-icon-size="small"
      to={href}
      {...props}
    />
  )
}
