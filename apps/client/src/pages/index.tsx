import { dehydrate, QueryClient } from "@tanstack/react-query"
import Hero from "components/Hero"
import type { GetServerSideProps } from "next"
import { getMe } from "../lib/auth"

export default function HomePage() {
  return (
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
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const token = ctx.req.cookies.token

  if (token) {
    const queryClient = new QueryClient()

    await queryClient.prefetchQuery(["self"], () => getMe(token))

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    }
  }

  return {
    props: {},
  }
}
