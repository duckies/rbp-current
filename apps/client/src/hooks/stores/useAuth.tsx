import type { User } from "@rbp/server"
import type { UseMutateFunction } from "@tanstack/react-query"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getMe } from "lib/auth"
import nookies, { destroyCookie } from "nookies"
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
    onError: (error: any) => {
      console.log(error, nookies.get(null))
      if (error?.statusCode === 401 || error?.statusCode === 403) {
        // This is not working :)
        destroyCookie(null, "token")
      }
    },
  })

  const logout = useMutation({
    mutationFn: async () => {
      console.log("Logout Mutation")
      destroyCookie(null, "token")
      client.invalidateQueries({ queryKey: ["user", "self"] })
    },
  })

  const value = useMemo(
    () => ({
      user,
      error,
      isLoading,
      logout: logout.mutateAsync,
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
