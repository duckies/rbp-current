import { Alert } from "components/content/Alert"
import { Breadcrumbs } from "components/content/Breadcrumbs"
import Hero from "components/Hero"
import { getMarkdownLayout } from "components/layouts/Markdown"
import { useWowhead } from "hooks/useWowhead"
import type { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import { DifficultyProvider } from "stores/difficulty"
import type { Page } from "types"
import { getDocumentStructure } from "utils/markdown"

export const DocumentPage: Page<any> = (props) => {
  // Forcibly refresh Wowhead links.
  useWowhead()

  if (!props.document.documents) {
    const segments = props.document.filePath.split("/")
    const contentIndex = segments.indexOf("content")
    const path = segments.slice(contentIndex + 1).join("/")

    const Component = dynamic(() => import(`../../content/${path}`))

    return (
      <>
        <DifficultyProvider>
          <Hero>
            <Breadcrumbs />
            <Hero.Title>{props.document.frontmatter.title}</Hero.Title>
            <Hero.Caption>{props.document.frontmatter.description}</Hero.Caption>
          </Hero>
          <main className="prose prose-invert relative mx-auto max-w-none lg:prose-lg">
            <Component />
            <Alert>Ignore this box, this site is still under construction.</Alert>
            <pre>{JSON.stringify(props, null, 2)}</pre>
          </main>
        </DifficultyProvider>
      </>
    )
  } else {
    return (
      <div>
        <pre>{JSON.stringify(props.document.documents, null, 2)}</pre>
      </div>
    )
  }
}

export const getStaticProps: GetStaticProps = (ctx) => {
  const params: string[] = ctx.params?.params as string[]

  const structure = getDocumentStructure()

  for (const [docParams, document] of structure.entries()) {
    if ((docParams as string[]).every((docParam, index) => docParam === params[index])) {
      return {
        props: {
          params,
          document,
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
      params: { params: params.map((p) => (p === "strategies" ? "strats" : p)) },
    })),
    fallback: false,
  }
}

DocumentPage.getLayout = (page) => getMarkdownLayout(page)

export default DocumentPage
