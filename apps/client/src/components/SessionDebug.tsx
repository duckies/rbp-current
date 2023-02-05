"use client"

import { useSession } from "next-auth/react"

export function SessionDebug() {
  const session = useSession()

  return (
    <div className="prose rounded-md shadow-lg">
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}
