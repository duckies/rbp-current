"use client"

import { useRouter } from "next/router"
import NProgress from "nprogress"
import { useEffect, useRef } from "react"

export default function LoadingBar({ delay = 100 }) {
  const router = useRouter()
  const timeout = useRef<NodeJS.Timeout | undefined>()

  const start = () => {
    timeout.current = setTimeout(NProgress.start, delay)
  }

  const done = () => {
    clearTimeout(timeout.current)
    NProgress.done()
  }

  useEffect(() => {
    router.events.on("routeChangeStart", start)
    router.events.on("routeChangeComplete", done)
    router.events.on("routeChangeError", done)
    return () => {
      router.events.off("routeChangeStart", start)
      router.events.off("routeChangeComplete", done)
      router.events.off("routeChangeError", done)
    }
  })

  return <></>
}
