import { Container } from "components/Container"
import Footer from "components/Footer"
import Header from "components/Header"
import { getMe } from "lib/auth"
import type { GetServerSideProps } from "next"
import Image from "next/image"
import { useBackground } from "stores/background"

function LayoutBackground() {
  const { background } = useBackground()

  return (
    <div className="absolute inset-0 -z-10 h-[440px] overflow-hidden lg:h-[750px]">
      <div className="hero-gradient absolute inset-[-50vw] z-[10] animate-[5s_infinite_spin] opacity-40" />
      <Image className="h-full w-full object-cover" src={background} fill alt="" priority />
      <div className="absolute inset-0 z-[20] bg-gradient-to-t from-surface-800 to-surface-800/[65%]" />
    </div>
  )
}

type DefaultLayoutProps = {
  children: React.ReactNode
}
export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <LayoutBackground />
      <Container className="min-h-[700px] pb-[90px]">{children}</Container>
      <Footer />
    </>
  )
}

export const getDefaultLayout = (page: React.ReactNode) => <DefaultLayout>{page}</DefaultLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.token

  if (token) {
    return {
      props: {
        user: await getMe(token),
      },
    }
  }

  return {
    props: {},
  }
}
