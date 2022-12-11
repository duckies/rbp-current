import localFont from "@next/font/local"
import type { User } from "@rbp/server"
import type { DehydratedState } from "@tanstack/react-query"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "components/common/LoadingBar/loading-bar.css"
import { DefaultLayout } from "components/layouts/Default"
import { AuthProvider } from "hooks/stores/useAuth"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useState } from "react"
import "styles/global.css"

const wotfard = localFont({
  variable: "--font-wotfard",
  src: [
    { path: "../../public/fonts/wotfard/wotfard-regular-webfont.woff2", weight: "400" },
    { path: "../../public/fonts/wotfard/wotfard-medium-webfont.woff2", weight: "500" },
    { path: "../../public/fonts/wotfard/wotfard-semibold-webfont.woff2", weight: "600" },
  ],
})

type MyAppProps = AppProps<{
  dehydratedState?: DehydratedState
  user?: User
}>

type AppPropsWithLayout = Omit<MyAppProps, "Component"> & {
  Component: AppProps["Component"] & { getLayout?: (page: React.ReactNode) => React.ReactNode }
}

const LoadingBar = dynamic(() => import("components/common/LoadingBar"), {
  ssr: false,
})

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())
  const getLayout = Component.getLayout || ((page) => <DefaultLayout>{page}</DefaultLayout>)

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Head>
          <title>Really Bad Players</title>
        </Head>
        <style jsx global>
          {`
            :root {
              --font-wotfard: ${wotfard.style.fontFamily};
            }
          `}
        </style>
        <LoadingBar />
        {getLayout(<Component {...pageProps} />)}
      </AuthProvider>
    </QueryClientProvider>
  )
}
