import localFont from "@next/font/local";
import type { User } from "@rbp/server";
import type { DehydratedState } from "@tanstack/react-query";
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "components/common/LoadingBar/loading-bar.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useState } from "react";
import { SSRProvider } from "react-aria";
import "styles/global.css";
import { AuthProvider } from "../hooks/stores/useAuth";

const wotfard = localFont({
  variable: "--font-wotfard",
  src: [
    { path: "../../public/fonts/wotfard/wotfard-regular-webfont.woff2", weight: "400" },
    { path: "../../public/fonts/wotfard/wotfard-medium-webfont.woff2", weight: "500" },
    { path: "../../public/fonts/wotfard/wotfard-semibold-webfont.woff2", weight: "600" },
  ],
});

type MyAppProps = AppProps<{
  dehydratedState?: DehydratedState;
  user?: User;
}>;

const LoadingBar = dynamic(() => import("components/common/LoadingBar"), {
  ssr: false,
});

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <>
      <SSRProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <AuthProvider initialState={{ user: pageProps.user }}>
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
              <Component {...pageProps} />
            </AuthProvider>
          </Hydrate>
        </QueryClientProvider>
        <LoadingBar />
      </SSRProvider>
    </>
  );
}
