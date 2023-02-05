import { Alert } from "components/content/custom/Alert"
import { Marker } from "components/content/custom/Marker"
import { Mechanic } from "components/content/custom/Mechanic"
import { Tab, Tabs } from "components/content/custom/Tabs"
import { Video } from "components/content/custom/Video"
import { ProseImage } from "components/content/prose/ProseImage"
import { ProseLink } from "components/content/prose/ProseLink"
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
