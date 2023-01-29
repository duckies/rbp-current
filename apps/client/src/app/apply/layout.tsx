import { Background } from "components/Background"
import { Container } from "components/Container"
import { Footer } from "components/Footer"
import { Header } from "components/Header"
import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"

type ApplyPageLayoutProps = {
  children: React.ReactNode
}

export default function ApplyPageLayout({ children }: ApplyPageLayoutProps) {
  return (
    <>
      <Header />

      <Background background={VaultBackground} />

      <Container className="mb-[90px]">{children}</Container>

      <Footer />
    </>
  )
}
