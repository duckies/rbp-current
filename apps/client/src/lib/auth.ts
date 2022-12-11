import type { User } from "@rbp/server"
import nookies from "nookies"
import { $get } from "./utils/fetch"

export function getMe(token?: string) {
  if (typeof window !== "undefined") {
    token = token ?? nookies.get(null, "token").token
  }

  if (!token) {
    return null
  }

  return $get<User>("/user/me", { headers: { Authorization: `Bearer ${token}` } })
}
