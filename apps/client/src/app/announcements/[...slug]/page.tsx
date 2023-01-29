import { Breadcrumbs } from "components/content/Breadcrumbs"
import Hero from "components/Hero"
import { MDX } from "components/MDX"
import { allAnnouncements } from "content"
import { notFound } from "next/navigation"

type AnnouncementPageProps = {
  params: {
    slug: string[]
  }
}

export default function AnnouncementPage({ params }: AnnouncementPageProps) {
  const path = `announcements/${params.slug.join("/")}`
  const document = allAnnouncements.find((doc) => doc.path === path)

  if (!document) {
    notFound()
  }

  return (
    <>
      <Hero>
        <div className="flex flex-col gap-4 lg:flex-row">
          <div className="flex-1">
            <Breadcrumbs blacklist={["normal", "heroic", "mythic"]} />
            <Hero.Title>{document.title} </Hero.Title>
            <Hero.Caption>{document.description}</Hero.Caption>
          </div>
        </div>
      </Hero>
      <main className="prose prose-invert relative mx-auto max-w-none lg:prose-lg">
        <MDX code={document.body.code} />
      </main>
    </>
  )
}
