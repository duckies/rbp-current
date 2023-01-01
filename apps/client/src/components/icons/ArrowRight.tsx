import type { SVGProps } from "react"

export function IconArrowRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6 12h12.5m0 0l-6-6m6 6l-6 6"
      ></path>
    </svg>
  )
}
