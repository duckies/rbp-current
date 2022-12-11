import { MDXProvider } from "@mdx-js/react"
import { Alert } from "components/content/Alert"
import { Mechanic } from "components/content/Mechanic"
import { ProseImage } from "components/content/prose/ProseImage"
import { ProseLink } from "components/content/prose/ProseLink"
import { Tabs } from "components/content/Tabs"
import { Video } from "components/content/Video"
import Image from "next/image"
import type { FC, PropsWithChildren } from "react"

const components = {
  a: ProseLink,
  Image,
  ProseImage,
  Tabs,
  Alert,
  Mechanic,
  Video,
}

export const MarkdownLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>
}
