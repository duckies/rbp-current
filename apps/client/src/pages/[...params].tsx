import { Breadcrumbs } from "components/content/Breadcrumbs"
import Hero from "components/Hero"
import { getMarkdownLayout } from "components/layouts/Markdown"
import { DocumentGrid } from "features/content/components/DocumentGrid"
import { useWowhead } from "hooks/useWowhead"
import type { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"
import { BackgroundProvider } from "stores/background"
import { DifficultyProvider } from "stores/difficulty"
import type { Page } from "types"
import type { Category, Document } from "utils/markdown"
import { getDocumentStructure } from "utils/markdown"

type Params = { params: string[] } & (Document | Category)

export const DocumentPage: Page<Params> = (props) => {
  // Forcibly refresh Wowhead links.
  useWowhead()

  if ("filePath" in props) {
    const segments = props.filePath.split("/")
    const contentIndex = segments.indexOf("content")
    const path = segments.slice(contentIndex + 1).join("/")

    const Component = dynamic(() => import(`../../content/${path}`))

    return (
      <>
        <DifficultyProvider>
          <Hero>
            <Breadcrumbs />
            <Hero.Title>{props.frontmatter.title}</Hero.Title>
            <Hero.Caption>{props.frontmatter.description}</Hero.Caption>
          </Hero>
          <main className="prose prose-invert relative mx-auto max-w-none lg:prose-lg">
            <Component />
          </main>
        </DifficultyProvider>
      </>
    )
  } else {
    return (
      <div>
        <Hero>
          <Breadcrumbs />
          <Hero.Title>{props.title}</Hero.Title>
          <Hero.Caption>{props.caption}</Hero.Caption>
        </Hero>

        <DocumentGrid documents={props.documents} />

        {props.categories.map((category) => (
          <div key={category.url} className="mb-4">
            <h2 className="mb-4 text-2xl font-bold">{category.title}</h2>

            <DocumentGrid documents={category.documents} />
          </div>
        ))}
      </div>
    )
  }
}

export const getStaticProps: GetStaticProps = (ctx) => {
  const params: string[] = ctx.params?.params as string[]

  const structure = getDocumentStructure()

  for (const [docParams, categoryOrDocument] of structure.entries()) {
    if ((docParams as string[]).every((docParam, index) => docParam === params[index])) {
      return {
        props: {
          params,
          ...categoryOrDocument,
        },
      }
    }
  }

  return {
    notFound: true,
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  const structure = getDocumentStructure()

  return {
    paths: Array.from(structure.keys()).map((params) => ({
      params: { params },
    })),
    fallback: false,
  }
}

DocumentPage.getLayout = (page) => (
  <BackgroundProvider src={VaultBackground}>{getMarkdownLayout(page)}</BackgroundProvider>
)

export default DocumentPage
