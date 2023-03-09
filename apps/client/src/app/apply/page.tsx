import Hero from "components/Hero"
import { getForm } from "hooks/queries/form"

export default async function ApplyPage() {
  const form = await getForm(1)

  return (
    <>
      <Hero>
        <Hero.Title>Really Bad Maintenance</Hero.Title>
        <Hero.Caption>We&apos;re always recruiting the best of the worst.</Hero.Caption>
      </Hero>

      {JSON.stringify(form, null, 2)}
    </>
  )
}
