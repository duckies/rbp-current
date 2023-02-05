"use client"

import Button from "components/Button"
import { signOut, useSession } from "next-auth/react"
import { useCallback } from "react"

export function Dashboard() {
  const { data } = useSession()

  const onSignOut = useCallback(() => {
    signOut({
      redirect: false,
      callbackUrl: "/",
    })
  }, [])

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-md bg-surface-800 p-7 shadow-lg">
          <h2 className="text-xl font-semibold">Discord</h2>
          <p className="mb-4"></p>
          <ul>
            <li>
              <span className="mr-4 font-semibold">Discord Tag</span>
              {data?.user?.discord?.identifier}
            </li>
          </ul>
        </div>
        <div className="rounded-md bg-surface-800 p-7 shadow-lg">
          <h2 className="text-xl font-semibold">Connect Battle.net</h2>
          <p className="mb-4">Not yet implemented</p>

          <Button disabled>Link Battle.net</Button>
        </div>
      </div>

      <Button onClick={onSignOut}>Sign Out</Button>
    </div>
  )
}
