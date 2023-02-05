import { Background } from "components/Background"
import { Card } from "components/Card"
import { Container } from "components/Container"
import { Dashboard } from "components/Dashboard"
import { Footer } from "components/Footer"
import { Header } from "components/Header"
import Hero from "components/Hero"
import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"

export default function DashboardPage() {
  return (
    <>
      <Header />

      <Background background={VaultBackground} />

      <Container className="mb-[90px]">
        <Hero>
          <Hero.Title>Really Bad Dashboard</Hero.Title>
          <Hero.Caption>Configure your really bad account.</Hero.Caption>
        </Hero>
        <Card>
          <Dashboard />
        </Card>
      </Container>

      <Footer />
    </>
  )
}
