import { User as UserEntity } from "@rbp/server"
import "next-auth"

declare module "next-auth" {
  interface Profile {}

  interface User {
    id: number
    token: string
  }

  interface Session {
    user: UserEntity
    token: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub: number
    token: string
  }
}
