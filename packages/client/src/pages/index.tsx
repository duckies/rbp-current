import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getMe } from '../lib/auth';
import Hero from 'components/Hero';
import { DefaultLayout } from 'components/layouts/DefaultLayout';

export interface HomePageProps {
  token: string | null;
}

export default function HomePage() {
  return (
    <DefaultLayout>
      <Hero>
        <h1>Recruiting for Dragonflight</h1>
        <p>We march badly into the land of dragons.</p>
      </Hero>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = nookies.get(ctx);

  try {
    if (token) {
      return {
        props: {
          user: await getMe(ctx),
        },
      };
    }
  } catch (error) {
    console.error(error);
  }

  return {
    props: {},
  };
};
