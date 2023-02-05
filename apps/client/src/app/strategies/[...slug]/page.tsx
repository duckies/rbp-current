import { Breadcrumbs } from "components/content/Breadcrumbs"
import { DifficultyDropdown } from "components/content/custom/DifficultyPicker"
import { MDX } from "components/content/MDX"
import Hero from "components/Hero"
import { allStrategies } from "content"
import { notFound } from "next/navigation"

type StrategiesPageProps = {
  params: {
    slug: string[]
  }
}

export default function StrategiesPage({ params }: StrategiesPageProps) {
  const path = `strategies/${params.slug.join("/")}`
  const document = allStrategies.find((doc) => doc.path === path)

  if (!document || (process.env.NODE_ENV === "production" && document.draft)) {
    notFound()
  }

  const availableDifficulties = allStrategies
    .filter((doc) => doc.basePath === document.basePath)
    .map((doc) => doc.difficulty.toLowerCase())

  return (
    <>
      <Hero>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <Breadcrumbs blacklist={["normal", "heroic", "mythic"]} />
            <Hero.Title>{document.title} </Hero.Title>
            <Hero.Caption>{document.description}</Hero.Caption>
          </div>
          <div className="flex justify-center lg:items-center">
            <DifficultyDropdown
              className="inline-flex h-10"
              available={availableDifficulties as any[]}
            />
          </div>
        </div>
      </Hero>
      <main className="prose prose-invert relative mx-auto max-w-none lg:prose-lg">
        <MDX code={document.body.code} />
      </main>
    </>
  )
}
