import type { GetServerSideProps } from 'next';
import Image from 'next/image';
import type { Provider } from '@rbp/server';
import nookies from 'nookies';
import Card from 'components/Card';
import background from 'public/images/login-screen.webp';
import css from 'styles/layouts/callout.module.scss';
import { callback } from 'hooks/auth';

export default function CallbackPage() {
  return (
    <div className={css.callout}>
      <div className={css.background}>
        <Image
          src={background}
          layout="fill"
          priority
          objectFit="cover"
          objectPosition="60% 50%"
        />
      </div>

      <Card className={css.window}>
        <h1>Really Bad Players</h1>
        <p>Logging you in...</p>
      </Card>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const provider = ctx.params?.provider;
  const code = ctx.query?.code;

  // TODO: Validate provider & code.

  if (provider && code) {
    const { token } = await callback(provider as Provider, code as string);

    nookies.set(ctx, 'token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
