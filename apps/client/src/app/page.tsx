import Card from "components/Card"
import { Carousel } from "components/Carousel"
import { Container } from "components/Container"
import { Footer } from "components/Footer"
import { Header } from "components/Header"
import { allAnnouncements } from "content"
import { getSlides } from "features/slides/api"

export default async function IndexPage() {
  const slides = await getSlides()

  const latestPosts = [...allAnnouncements]
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <>
      <Header className="fixed" />

      <Carousel slides={slides} />

      <Container className="mb-[90px]">
        <div className="grid grid-cols-12">
          <div className="col-span-12 grid gap-4 md:col-span-8">
            <h2 className="text-2xl font-semibold">Latest Announcements</h2>
            {latestPosts.map((post) => (
              <Card key={post._id} href={post.path}>
                <Card.Title>{post.title}</Card.Title>
                <Card.Caption>{post.excerpt}</Card.Caption>
              </Card>
            ))}
          </div>
        </div>
      </Container>

      <Footer />
    </>
  )
}
