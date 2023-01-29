"use client"

import { ChevronRightIcon } from "components/icons/ChevonRight"
import { cva } from "cva"
import { useBreadcrumbs } from "hooks/useBreadcrumbs"
import Link from "next/link"
import type { FC } from "react"

const breadcrumbCSS = cva(["text-gray-300 hover:text-white transition-color hidden lg:flex"])()
const separatorCSS = cva(["mx-2 h-4 w-4 self-center"])()

type BreadcrumbsProps = {
  inclusive?: boolean
  blacklist?: string[]
}

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ inclusive, blacklist }) => {
  const breadcrumbs = useBreadcrumbs({ inclusive, blacklist })

  return (
    <nav className="mb-3 h-[24px]" aria-label="breadcrumbs">
      <ol className="flex">
        {breadcrumbs?.map(({ breadcrumb, href }, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li key={href} className={breadcrumbCSS}>
              <Link href={href}>{breadcrumb}</Link>
              {!isLast && <ChevronRightIcon className={separatorCSS} />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
