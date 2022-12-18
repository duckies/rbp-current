import { Container } from "components/Container"
import { Footer } from "components/Footer"
import { Header } from "components/Header"
import type { Transition, Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import { getMe } from "lib/auth"
import type { GetServerSideProps } from "next"
import Image from "next/image"
import { useRouter } from "next/router"
import type { FC, ReactNode } from "react"
import { useBackground } from "stores/background"

const LayoutBackground: FC = () => {
  const { background } = useBackground()

  return (
    <div className="absolute inset-0 -z-10 h-[440px] overflow-hidden lg:h-[750px]">
      <div className="hero-gradient absolute inset-[-50vw] z-[10] animate-[5s_infinite_spin] opacity-40" />
      <Image className="h-full w-full object-cover" src={background} fill alt="" priority />
      <div className="absolute inset-0 z-[20] bg-gradient-to-t from-surface-900 to-surface-900/[65%]" />
    </div>
  )
}

type DefaultLayoutProps = {
  children: ReactNode
}

const variants: Variants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
}

const transition: Transition = {
  duration: 0.25,
}

export const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  const router = useRouter()

  return (
    <>
      <Header />
      <LayoutBackground />
      <Container className="min-h-[700px] pb-[90px]">
        <AnimatePresence initial={false}>
          <motion.div
            key={router.asPath}
            animate="in"
            initial="out"
            exit="out"
            variants={variants}
            transition={transition}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Container>
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
