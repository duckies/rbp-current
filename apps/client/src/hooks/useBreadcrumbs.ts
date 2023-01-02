import { useRouter } from "next/router"
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
  const router = useRouter()
  const [breadcrumbs, setBreadcrumbs] = useState<Array<Breadcrumb> | null>(null)
  const includeLast = inclusive || false

  useEffect(() => {
    if (router) {
      const linkPath = router.asPath.split("/")
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
  }, [router, includeLast, blacklist])

  return breadcrumbs
}
