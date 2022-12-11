import clsx from "clsx"
import { Link } from "components/navigation/link"
import type { VariantProps } from "cva"
import { cva } from "cva"
import type { ImageProps } from "next/image"
import Image from "next/image"
import type { DOMProps } from "types/shared"
import css from "./content.module.scss"

export type ContentListProps = DOMProps<"ul"> & VariantProps<typeof listCSS>

const listCSS = cva([css["content-list"]], {
  variants: {
    style: {
      featured: css["content-list--featured"],
      grid: css["content-list--grid"],
    },
  },
})

export function ContentList({ style, ...props }: ContentListProps) {
  return <ul className={listCSS({ style })} {...props} />
}

export type ContentListItemProps = DOMProps<"li"> & {
  to: string
  className?: string
  children: React.ReactNode
  title: string
  img?: ImageProps
} & VariantProps<typeof listItemCSS>

const listItemCSS = cva(css["content-list__item"], {
  variants: {
    style: {
      featured: css["content-list__item--featured"],
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
      <Link className={clsx(className, css.link)} to={to}>
        {img && <Image className={css.image} {...img} alt="" />}
        <div className={css.imageAfter}>
          <div className={css.heading}>{title}</div>
          <p className={css.text}>{children}</p>
        </div>
      </Link>
    </li>
  )
}
