import { getMarkdownLayout } from "components/layouts/Markdown"
import VaultBackground from "public/images/strategies/vault/vault-of-the-incarnates.jpg"
import { BackgroundProvider } from "stores/background"
import type { Page } from "types"

export const VaultStrategiesPage: Page = () => {
  return <div>NYI</div>
}

VaultStrategiesPage.getLayout = (page) => (
  <BackgroundProvider src={VaultBackground}>{getMarkdownLayout(page)}</BackgroundProvider>
)

export default VaultStrategiesPage
