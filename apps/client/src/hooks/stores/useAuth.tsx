import type { User } from "@rbp/server"
import type { UseMutateFunction } from "@tanstack/react-query"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe } from "lib/auth"
import nookies from "nookies"
import { createContext, useContext, useMemo } from "react"

type AuthContextValue = {
  user: User | null
  error: unknown
  logout: UseMutateFunction<unknown, unknown, void, unknown>
}

export const AuthContext = createContext<AuthContextValue | null>(null)

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const client = useQueryClient()

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["user", "self"],
    initialData: null,
    retry: 0,
    queryFn: () => getMe(),
  })

  const logout = useMutation({
    onSuccess: () => {
      nookies.destroy(null, "token")
      client.invalidateQueries({ queryKey: ["user", "self"] })
    },
  })

  const value = useMemo(
    () => ({
      user,
      error,
      isLoading,
      logout: logout.mutate,
    }),
    [user, error, isLoading, logout.mutate]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider")
  }

  return context
}
