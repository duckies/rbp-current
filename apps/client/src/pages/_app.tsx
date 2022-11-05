import '@master/css';
import type { User } from '@rbp/server';
import type { DehydratedState } from '@tanstack/react-query';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import 'components/common/LoadingBar/loading-bar.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { useState } from 'react';
import { SSRProvider } from 'react-aria';
import 'styles/global.css';
import 'styles/master.css';
import { AuthProvider } from '../hooks/stores/useAuth';

type MyAppProps = AppProps<{
  dehydratedState?: DehydratedState
  user?: User
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
        </QueryClientProvider>
        <LoadingBar />
      </SSRProvider>
    </>
  );
}
