import { DefaultLayout } from "components/layouts/Default"
import { allStrategies } from "contentlayer/generated"

export default function PostsPage() {
  return (
    <DefaultLayout>
      <pre>{JSON.stringify(allStrategies, null, 2)}</pre>
    </DefaultLayout>
  )
}
