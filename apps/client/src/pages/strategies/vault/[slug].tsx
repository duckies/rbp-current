import Hero from "components/Hero"
import { MarkdownLayout } from "components/layouts/Markdown"
import type { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import type { FC } from "react"
import { useEffect, useRef } from "react"
import { findMDXDocuments, getMDXDocument } from "utils/markdown"

export const StrategyPage: FC<any> = ({ slug, frontmatter }) => {
  const Component = dynamic(() => import(`../../../../content/strategies/vault/${slug}.mdx`))
  const interval = useRef<ReturnType<typeof setInterval> | undefined>()

  // Forcibly refresh Wowhead links.
  useEffect(() => {
    interval.current = setInterval(() => {
      if (
        document.querySelector('[href*="wowhead.com/spell="') &&
        !document.querySelector("[data-wh-icon-added]")
      ) {
        window.$WowheadPower?.refreshLinks()
      } else {
        clearInterval(interval.current)
      }
    }, 250)

    return () => {
      clearInterval(interval.current)
    }
  })

  return (
    <div>
      <MarkdownLayout>
        <Hero>
          <Hero.Title>
            {frontmatter.difficulty} {frontmatter.title}
          </Hero.Title>
          <Hero.Caption>{frontmatter.description}</Hero.Caption>
        </Hero>
        <main className="prose prose-invert relative mx-auto max-w-none lg:prose-lg">
          <Component />
          {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
        </main>
      </MarkdownLayout>
    </div>
  )
}

export const getStaticProps: GetStaticProps = (ctx) => {
  const { slug } = ctx.params || {}

  if (!slug) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      slug,
      ...getMDXDocument(`strategies/vault/${slug}`),
    },
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: findMDXDocuments("strategies/vault").map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export default StrategyPage
