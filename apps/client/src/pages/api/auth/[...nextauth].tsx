import { callback, getMe } from "lib/auth"
import NextAuth, { type AuthOptions } from "next-auth"
import DiscordProvider from "next-auth/providers/discord"

export const options: AuthOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID!,
      clientSecret: process.env.DISCORD_SECRET!,
    }),
  ],
  callbacks: {
    signIn: async ({ account, user }) => {
      if (account) {
        const response = await callback(account.provider as any, account)

        let key: keyof typeof user
        for (key in user) {
          delete user[key]
        }

        user.id = response.user.id
        user.token = response.token

        return true
      }
      return false
    },
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          sub: user.id.toString(),
          token: user.token,
        }
      }

      return token as any
    },
    session: async ({ session, token }) => {
      const user = await getMe(token.token)

      return {
        ...session,
        user,
        token: token.token,
      }
    },
  },
}

export default NextAuth(options)
