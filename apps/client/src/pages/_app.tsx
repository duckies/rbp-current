import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "components/common/LoadingBar/loading-bar.css"
import { getDefaultLayout } from "components/layouts/Default"
import { AuthProvider } from "hooks/stores/useAuth"
import type { AppProps } from "next/app"
import dynamic from "next/dynamic"
import Head from "next/head"
import { useState } from "react"
import { BackgroundProvider } from "stores/background"
import "styles/global.css"
import type { Page } from "types"

type AppPropsWithLayout = AppProps & {
  Component: Page<any>
}

const LoadingBar = dynamic(() => import("components/common/LoadingBar"), {
  ssr: false,
})

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient())
  const getLayout = Component.getLayout || getDefaultLayout

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BackgroundProvider>
          <Head>
            <title>Really Bad Players</title>
          </Head>
          <LoadingBar />
          {getLayout(<Component {...pageProps} />)}
        </BackgroundProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
