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
}

export const useBreadcrumbs = ({ inclusive }: UseBreadcrumbOptions) => {
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

      setBreadcrumbs([
        { breadcrumb: "Home", href: "/" },
        ...(includeLast ? pathArray : pathArray.slice(0, -1)),
      ])
    }
  }, [router, includeLast])

  return breadcrumbs
}
