import type { NextPage } from "next"
import type { ReactElement, ReactNode } from "react"

export type Page<T = any> = NextPage<T> & {
  /**
   * Wraps the page in a layout component. Defaults to `DefaultLayout` if omitted.
   */
  getLayout?: (page: ReactElement) => ReactNode
}
