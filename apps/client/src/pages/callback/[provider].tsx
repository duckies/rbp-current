import type { Provider } from "@rbp/server"
import Card from "components/Card"
import { callback } from "hooks/auth"
import type { GetServerSideProps } from "next"
import Image from "next/image"
import nookies from "nookies"
import background from "public/images/login-screen.webp"

export default function CallbackPage() {
  return (
    <div>
      <div>
        <Image
          src={background}
          layout="fill"
          priority
          objectFit="cover"
          objectPosition="60% 50%"
          alt=""
        />
      </div>

      <Card>
        <h1>Really Bad Players</h1>
        <p>Logging you in...</p>
      </Card>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const provider = ctx.params?.provider
  const code = ctx.query?.code

  // TODO: Validate provider & code.
  try {
    if (provider && code) {
      const { token } = await callback(provider as Provider, code as string)

      nookies.set(ctx, "token", token, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })

      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      }
    }
  } catch (error: any) {
    if (error?.statusCode === 401 || error?.statusCode === 403) {
      nookies.destroy(ctx, "token")
    }

    return {
      props: {},
    }
  }

  return {
    props: {},
  }
}
