import Hero from "components/Hero"
import { allStrategies, type Strategy } from "content"
import Image from "next/image"
import Link from "next/link"
import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"

export default function StrategiesPage() {
  const instances = [
    {
      name: "Vault of the Incarnates",
      background: VaultBackground,
      encounters: [
        {
          name: "Eranog",
          description: "Eggnog, just in time for the holidays!",
          slug: "eranog",
        },
        {
          name: "The Primal Council",
          description: "The shaman illuminati, defeated effortlessly.",
          slug: "primal-council",
        },
        {
          name: "Terros",
          description: "He doesn't need legs where he isn't going.",
          slug: "terros",
        },
        {
          name: "Sennarth",
          description: "The kegel champion of Azeroth.",
          slug: "sennarth",
        },
        {
          name: "Kurog Grimtotem",
          description: `Captain planet, only without that "heart" kid.`,
          slug: "kurog",
        },
        {
          name: "Dathea, Ascended",
          description: "\"Toto, I've a feeling we're not in Kansas anymore.\"",
          slug: "dathea",
        },
        {
          name: "Broodkeeper Diurna",
          description: "A mother, and the hot car she keeps leaving her kids in.",
          slug: "broodkeeper",
        },
        {
          name: "Raszageth",
          description: "Her arms may be tiny, but her breath is mighty.",
          slug: "raszageth",
        },
      ] as Array<{ name: string; slug: string; description: string; strategies: Strategy[] }>,
    },
  ]

  for (const instance of instances) {
    for (const encounter of instance.encounters) {
      encounter.strategies = allStrategies.filter(
        (strategy) =>
          strategy.title.includes(encounter.name) &&
          !(process.env.NODE_ENV === "production" && strategy.draft)
      )
    }
  }

  return (
    <>
      <Hero>
        <Hero.Title>Really Bad Strategies</Hero.Title>
        <Hero.Caption>Boss notes, scribbles, and attempted learning.</Hero.Caption>
      </Hero>
      <div>
        {instances.map(({ name, background, encounters }) => (
          <div className="overflow-hidden rounded-md bg-surface-600 p-8" key={name}>
            <div className="relative mb-8 flex h-[200px] items-center overflow-hidden rounded-lg shadow-lg">
              <Image className="absolute inset-0 object-cover" src={background} fill alt="" />
              <div className="relative p-10">
                <h2 className="mb-5 text-3xl font-bold leading-tight">{name}</h2>
              </div>
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {encounters.map((encounter) => (
                <div
                  key={encounter.name}
                  className="flex justify-between gap-x-2 rounded-lg bg-surface-500 py-5 px-6"
                >
                  <div className="flex flex-col justify-between gap-1">
                    <div>
                      <h3 className="mb-3 text-2xl font-bold">{encounter.name}</h3>
                      <p className="text-slate-50">{encounter.description}</p>
                    </div>
                    <div className="mt-3 flex items-end gap-3">
                      {encounter.strategies.map((strategy) => (
                        <Link
                          className="rounded-lg bg-yellow-300 px-3 py-1 text-black"
                          key={strategy.path}
                          href={strategy.path}
                        >
                          {strategy.difficulty}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="relative h-[90px] w-[90px] flex-shrink-0 rounded-md border-[3px] border-yellow-300 bg-yellow-300/50">
                    <Image
                      className="rounded-lg"
                      src={`/images/strategies/vault/portraits/${encounter.slug}.png`}
                      height="90"
                      width="90"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
