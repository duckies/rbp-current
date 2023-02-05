"use client"

import { ChevronRightIcon } from "components/icons/ChevonRight"
import { useBreadcrumbs } from "hooks/useBreadcrumbs"
import Link from "next/link"

type BreadcrumbsProps = {
  inclusive?: boolean
  blacklist?: string[]
}

export function Breadcrumbs({ inclusive, blacklist }: BreadcrumbsProps) {
  const breadcrumbs = useBreadcrumbs({ inclusive, blacklist })

  return (
    <nav className="mb-3 h-[24px]" aria-label="breadcrumbs">
      <ol className="flex">
        {breadcrumbs?.map(({ breadcrumb, href }, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li
              key={href}
              className="transition-color hidden text-gray-300 hover:text-white lg:flex"
            >
              <Link href={href}>{breadcrumb}</Link>
              {!isLast && <ChevronRightIcon className="mx-w h-4 w-4 self-center" />}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
