import { getMarkdownLayout } from "components/layouts/Markdown"
import type { Page } from "pages/_app"
import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"
import { BackgroundProvider } from "stores/background"

export const VaultStrategiesPage: Page = () => {
  return <div>NYI</div>
}

VaultStrategiesPage.getLayout = (page) => (
  <BackgroundProvider src={VaultBackground}>{getMarkdownLayout(page)}</BackgroundProvider>
)

export default VaultStrategiesPage
