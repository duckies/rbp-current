import type { Provider, User } from "@rbp/server"
import { $get, $post } from "utils/fetch"

export function callback(provider: Provider, tokens: any) {
  return $post<{ user: User; token: string }>(`/auth/callback/${provider}`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expires_at: tokens.expires_at,
    }),
  })
}

export function getMe(token: string) {
  return $get<User>("/user/me", { headers: { Authorization: `Bearer ${token}` } })
}
