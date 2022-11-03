import type { UserDTO } from '@rbp/server';
import type { DehydratedState } from '@tanstack/react-query';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { AppProps } from 'next/app';
import 'styles/global.css';
import '@master/css';
import 'components/common/LoadingBar/loading-bar.css';
import Head from 'next/head';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { SSRProvider } from 'react-aria';
import { AuthProvider } from '../hooks/stores/useAuth';
import 'styles/master.css';

type MyAppProps = AppProps<{
  dehydratedState?: DehydratedState
  user?: UserDTO
}>;

const LoadingBar = dynamic(() => import('components/common/LoadingBar'), { ssr: false });

export default function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
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
              <Component {...pageProps} />
            </AuthProvider>
          </Hydrate>
          {/* <ReactQueryDevtools /> */}
        </QueryClientProvider>
        <LoadingBar />
      </SSRProvider>
    </>
  );
}