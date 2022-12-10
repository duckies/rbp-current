import { BlogPost } from "components/blog/post"
import Hero from "components/Hero"
import type { Strategy } from "contentlayer/generated"

type StrategiesLayoutProps = {
  strategies: Strategy[]
}

export function StrategiesLayout({ strategies }: StrategiesLayoutProps) {
  return (
    <div>
      <Hero>
        <Hero.Title>Really Bad Strategies</Hero.Title>
        <Hero.Caption>We are good at attacking bosses.</Hero.Caption>
      </Hero>
      {strategies.map((s) => (
        <BlogPost key={s._id} {...s} link={s.url} />
      ))}
    </div>
  )
}
