import type { GetServerSideProps } from 'next';
import nookies from 'nookies';
import { getMe } from '../lib/auth';
import Hero from 'components/Hero';
import { DefaultLayout } from 'layouts/Default';

export default function HomePage() {
  return (
    <DefaultLayout>
      <main>
        <Hero>
          <Hero.Title>Recruiting for Dragonflight</Hero.Title>
          <Hero.Caption>We march badly into the land of dragons.</Hero.Caption>
        </Hero>

        <section className="grid grid-flow-col  gap-4">
          <div className="col-span-4 flex flex-col gap-4">
            {/* {posts.map(post => (
              <BlogPostCard key={post.slug} {...post} />
            ))} */}
          </div>

          <aside className="col-span-1">
            <span>Beep boop progression.</span>
          </aside>
        </section>
      </main>
    </DefaultLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { token } = nookies.get(ctx);
  // const posts = getBlogPosts();

  try {
    if (token) {
      return {
        props: {
          user: await getMe(ctx),
          // posts,
        },
      };
    }
  }
  catch (error) {
    console.error(error);
  }

  return {
    props: {
      // posts,
    },
  };
};
