import { Breadcrumbs } from "components/content/Breadcrumbs"
import Hero from "components/Hero"
import { getMarkdownLayout, MarkdownLayout } from "components/layouts/Markdown"
import { useWowhead } from "hooks/useWowhead"
import type { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"
import { BackgroundProvider } from "stores/background"
import { DifficultyProvider } from "stores/difficulty"
import type { Page } from "types"
import { findMDXDocuments, getMDXDocument } from "utils/markdown"

export const StrategyPage: Page = ({ slug, frontmatter }) => {
  const Component = dynamic(() => import(`../../../../content/strategies/vault/${slug}.mdx`))

  // Forcibly refresh Wowhead links.
  useWowhead()

  return (
    <div>
      <DifficultyProvider>
        <MarkdownLayout>
          <Hero>
            <Breadcrumbs />
            <Hero.Title>
              {frontmatter.difficulty} {frontmatter.title}
            </Hero.Title>
            <Hero.Caption>{frontmatter.description}</Hero.Caption>
          </Hero>
          <main className="prose prose-invert relative mx-auto max-w-none lg:prose-lg">
            <Component />
          </main>
        </MarkdownLayout>
      </DifficultyProvider>
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

// StrategyPage.getLayout = ({ children }) => (
//   <DefaultLayout background={Background}>{children}</DefaultLayout>
// )

StrategyPage.getLayout = (page) => (
  <BackgroundProvider src={VaultBackground}>{getMarkdownLayout(page)}</BackgroundProvider>
)

export default StrategyPage
