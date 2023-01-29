import { Alert } from "components/content/Alert"
import { Marker } from "components/content/Marker"
import { Mechanic } from "components/content/Mechanic"
import { ProseImage } from "components/content/prose/ProseImage"
import { ProseLink } from "components/content/prose/ProseLink"
import { Tab, Tabs } from "components/content/Tabs"
import { Video } from "components/content/Video"
import { useMDXComponent } from "next-contentlayer/hooks"

type MDXProps = {
  code: string
}

const components = {
  a: ProseLink,
  Alert,
  Mechanic,
  ProseImage,
  Video,
  Tabs,
  Tab,
  Marker,
}

export function MDX({ code }: MDXProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
