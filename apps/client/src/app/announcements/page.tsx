import Card from "components/Card"
import Hero from "components/Hero"
import { allAnnouncements } from "content"

export default function AnnouncementsPage() {
  return (
    <>
      <Hero>
        <Hero.Title>Really Bad Announcements</Hero.Title>
        <Hero.Caption>News of the long-winded variety.</Hero.Caption>
      </Hero>
      <div>
        {allAnnouncements.map((announcement) => (
          <Card key={announcement._id} href={announcement.path}>
            <Card.Title>{announcement.title}</Card.Title>
            <Card.Caption>{announcement.description}</Card.Caption>
          </Card>
        ))}
      </div>
    </>
  )
}
