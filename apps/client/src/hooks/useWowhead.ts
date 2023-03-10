"use client"

import { useEffect, useRef } from "react"

export function useWowhead() {
  const interval = useRef<ReturnType<typeof setInterval> | undefined>()
  const attempts = useRef(0)

  const hasIncompleteLinks = () => {
    const wowheadLinks = document.querySelectorAll('[href*="wowhead.com/spell="')

    for (let i = 0; i < wowheadLinks.length; i++) {
      if (!wowheadLinks[i].getAttribute("data-wh-icon-added")) {
        return true
      }
    }
  }

  const refresh = () => {
    window.$WowheadPower!.refreshLinks()
  }

  useEffect(() => {
    const quit = () => {
      clearInterval(interval.current)
    }

    interval.current = setInterval(() => {
      if (attempts.current < 10 && window.$WowheadPower && hasIncompleteLinks()) {
        refresh()
        attempts.current++
      } else {
        if (attempts.current >= 10) {
          console.warn("Wowhead refresh failed after 10 attempts.")
        }
        quit()
      }
    }, 250)

    return quit
  })
}
