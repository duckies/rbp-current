import Hero from 'components/Hero';
import { DefaultLayout } from 'components/layouts/Default';
import type { GetServerSideProps } from 'next';
import { getMe } from '../lib/auth';

export default function HomePage() {
  return (
    <DefaultLayout>
      <main>
        <Hero>
          <Hero.Title>Recruiting for Dragonflight</Hero.Title>
          <Hero.Caption>We march badly into the land of dragons.</Hero.Caption>
        </Hero>

        <section className="grid grid-flow-col gap-4">
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
  const token = ctx.req.cookies.token;
  // const posts = getBlogPosts();

  if (token) {
    return {
      props: {
        user: await getMe(token),
        token,
      },
    };
  }

  return {
    props: {
      // posts,
    },
  };
};
