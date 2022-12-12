import Card from "components/Card"
import Hero from "components/Hero"
import { getMarkdownLayout } from "components/layouts/Markdown"
import { Link } from "components/Link"
import Image from "next/image"
import type { Page } from "pages/_app"

import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"
import { BackgroundProvider } from "stores/background"

const bosses = [
  { name: "Eranog", slug: "eranog" },
  { name: "Terros", slug: "terros" },
  { name: "The Primal Council", slug: "the-primal-council" },
  { name: "Sennarth, the Cold Breath", slug: "sennarth-the-cold-breath" },
  { name: "Dathea, Ascended", slug: "dathea-ascended" },
  { name: "Kurog Grimtotem", slug: "kurog-grimtotem" },
  { name: "Broodkeeper Diurna", slug: "broodkeeper-diurna" },
  { name: "Raszageth the Storm-Eater", slug: "raszageth-the-storm-eater" },
]

export const StrategiesPage: Page = () => {
  return (
    <>
      <Hero>
        <Hero.Title>Really Bad Strategies</Hero.Title>
        <Hero.Caption>Fight guides and resources.</Hero.Caption>
      </Hero>

      <div className="prose prose-invert max-w-none">
        <h2>Vault of the Incarnates</h2>

        <div className="grid gap-3 md:grid-cols-2">
          {bosses.map(({ name, slug }) => {
            return (
              <Card key={slug} className="group relative shadow-xl">
                <Link className="no-underline" to={`/strategies/vault/${slug}`} style="plain">
                  <div className="absolute right-0 top-0 flex h-full w-[65%] overflow-hidden">
                    <Image
                      className="contain absolute top-[-10%] right-[-20%] z-0 m-0 object-cover pl-6 shadow-indigo-500/50 drop-shadow-[0_10px_15px_rgba(249,203,88,0.1)] transition-all group-hover:scale-105 group-hover:drop-shadow-[0_10px_15px_rgba(249,203,88,0.75)]  group-hover:saturate-[1.35]"
                      src={`/images/strategies/vault/portraits/${slug}-inset.webp`}
                      sizes="(max-width: 640px) 150px, (max-width: 1024px) 300px"
                      fill
                      alt={name}
                    />
                  </div>

                  <div className="relative z-10">
                    <Card.Title className="text-shadow-md my-3 text-2xl">{name}</Card.Title>
                  </div>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  )
}

StrategiesPage.getLayout = (page) => (
  <BackgroundProvider src={VaultBackground}>{getMarkdownLayout(page)}</BackgroundProvider>
)

export default StrategiesPage
