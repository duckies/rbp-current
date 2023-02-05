"use client"

import { SessionProvider as NextAuthSessionProvider } from "next-auth/react"

type SessionProviderProps = {
  children: React.ReactNode
  session: any
}

export function SessionProvider({ children, session }: SessionProviderProps) {
  return (
    <NextAuthSessionProvider session={session} refetchOnWindowFocus={false}>
      {children}
    </NextAuthSessionProvider>
  )
}
