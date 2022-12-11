import type { Provider, User } from "@rbp/server"
import config from "lib/config"
import { $get } from "lib/utils/fetch"
import type { GetServerSidePropsContext } from "next"
import nookies from "nookies"

export function login() {
  const params = new URLSearchParams({
    client_id: config.DISCORD_CLIENT_ID,
    redirect_uri: `${window.location.origin}/callback/discord`,
    scope: "identify",
    response_type: "code",
    prompt: "none",
  })

  window.location.href = new URL(`https://discord.com/oauth2/authorize?${params}`).toString()
}

export function logout(ctx?: GetServerSidePropsContext) {
  nookies.destroy(ctx, "token")
}

export function callback(provider: Provider, code: string) {
  return $get<{ user: User; token: string }>(`/callback/${provider}?code=${code}`)
}
