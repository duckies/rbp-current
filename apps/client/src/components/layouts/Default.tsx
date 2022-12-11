import { Container } from "components/Container"
import Footer from "components/Footer"
import Header from "components/Header"
import { getMe } from "lib/auth"
import type { GetServerSideProps } from "next"
import Image from "next/image"
import background from "public/images/noise-bg.png"

export interface DefaultLayoutProps {
  children: React.ReactNode
}

function LayoutBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-[450px] overflow-hidden lg:h-[500px]">
      <div className="hero-gradient absolute inset-[-50vw] animate-[3s_infinite_spin]" />
      <Image className="h-full w-full object-fill" src={background} alt="" priority />
      <div className="to-surface-800/35 absolute inset-0 bg-gradient-to-t from-surface-800" />
    </div>
  )
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
