import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export interface Breadcrumb {
  /**
   * Breadcrumb title.
   */
  breadcrumb: string

  /**
   * The URL for the breadcrumb.
   */
  href: string
}

type UseBreadcrumbOptions = {
  /**
   * If true, the current page will be shown as a breadcrumb.
   */
  inclusive?: boolean

  /**
   * An array of breadcrum strings to exclude.
   */
  blacklist?: string[]
}

export const useBreadcrumbs = ({ inclusive, blacklist }: UseBreadcrumbOptions) => {
  const path = usePathname()
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(null)
  const includeLast = inclusive || false

  // TODO: I assume `usePathname` is available on the server, so `useEffect` is not necessary anymore.
  useEffect(() => {
    if (path) {
      const linkPath = path.split("/")
      linkPath.shift()

      const pathArray = linkPath.map((path, index) => {
        return {
          breadcrumb: path.charAt(0).toUpperCase() + path.slice(1),
          href: `/${linkPath.slice(0, index + 1).join("/")}`,
        }
      })

      let filteredPathArray = pathArray

      if (blacklist) {
        filteredPathArray = filteredPathArray.filter(
          (item) => !blacklist.includes(item.breadcrumb.toLowerCase())
        )
      }

      if (!includeLast) {
        filteredPathArray.pop()
      }

      setBreadcrumbs([{ breadcrumb: "Home", href: "/" }, ...filteredPathArray])
    }
  }, [path, includeLast, blacklist])

  return breadcrumbs
}
