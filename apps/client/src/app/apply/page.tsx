import Hero from "components/Hero"
import { Paper } from "components/Paper"
import Image from "next/image"

export default function ApplyPage() {
  return (
    <>
      <Hero>
        <Hero.Title>Really Bad Maintenance</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>
      <Paper className="relative overflow-hidden shadow-xl">
        <h2 className="mb-3 text-2xl font-bold">Application Offline 🚧</h2>

        <p>
          Our application is temporarily offline for upgrades to support Dragonflight. If you are
          interested in applying to join our guild contact our recruiter through Discord at{" "}
          <code className="rounded-md bg-yellow-300/20 px-1.5 py-1">Azzekal#6909</code>.
        </p>

        <Image
          className="pointer-events-none absolute bottom-[-10px] right-0 rotate-[-35deg]"
          src="/images/doodads/duck.png"
          width="62"
          height="62"
          alt="WoW duck"
        />
      </Paper>
    </>
  )
}
