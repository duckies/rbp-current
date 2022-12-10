import { allStrategies } from "contentlayer/generated"

export default function PostsPage() {
  return <pre>{JSON.stringify(allStrategies, null, 2)}</pre>
}
