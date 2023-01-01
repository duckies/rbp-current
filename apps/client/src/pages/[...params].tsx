import clsx from "clsx"
import Button from "components/Button"
import Card from "components/Card"
import { Breadcrumbs } from "components/content/Breadcrumbs"
import Hero from "components/Hero"
import { IconArrowRight } from "components/icons/ArrowRight"
import { getMarkdownLayout } from "components/layouts/Markdown"
import { useWowhead } from "hooks/useWowhead"
import type { GetStaticPaths, GetStaticProps } from "next"
import dynamic from "next/dynamic"
import Image from "next/image"
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

        {props.documents.map((document) => (
          <Card key={document.filePath} href={document.url} className="my-4">
            <Card.Title>{document.frontmatter.title}</Card.Title>
            <Card.Caption>{document.frontmatter.excerpt}</Card.Caption>

            <Button variant="unstyled" className="flex self-end">
              Read More <IconArrowRight className="h-5 w-5" />
            </Button>
          </Card>
        ))}

        {props.categories.map((category) => (
          <div key={category.url}>
            <h2 className="mb-4 text-2xl font-bold">{category.title}</h2>

            <div className="grid gap-4 md:grid-cols-2">
              {category.documents.map((document) => (
                <Card
                  key={document.url}
                  className="group relative overflow-hidden"
                  {...(document.frontmatter.disabled ? {} : { href: document.url })}
                >
                  {document.frontmatter.images?.inset && (
                    <div className="absolute right-0 top-0 flex h-full w-[30%]">
                      <Image
                        className={clsx(
                          "contain absolute top-[-10%] right-[-25%] z-0 m-0 overflow-visible object-cover pl-6 shadow-indigo-500/50",
                          document.frontmatter.disabled
                            ? "grayscale"
                            : "drop-shadow-[0_10px_15px_rgba(249,203,88,0.1)] transition-all group-hover:scale-105 group-hover:drop-shadow-[0_10px_15px_rgba(249,203,88,0.75)] group-hover:saturate-[1.35]"
                        )}
                        src={document.frontmatter.images.inset}
                        sizes="(max-width: 640px) 150px, (max-width: 1024px) 300px"
                        fill
                        alt=""
                      />
                    </div>
                  )}

                  <div className="relative z-10">
                    <Card.Title className="text-shadow-md my-3 text-2xl">
                      {document.frontmatter.title}
                    </Card.Title>

                    <Card.Caption className="text-gray-200 [text-shadow:1px_1px_3px_#000]">
                      {document.frontmatter.excerpt || document.frontmatter.description}
                    </Card.Caption>

                    {document.frontmatter.disabled ? (
                      <p className="text-yellow-200">🚧 Under Construction 🚧</p>
                    ) : (
                      <Button variant="unstyled" className="">
                        Read More{" "}
                        <IconArrowRight className="relative ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-2" />
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
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
