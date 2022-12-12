import { MDXProvider } from "@mdx-js/react"
import { Alert } from "components/content/Alert"
import { Marker } from "components/content/Marker"
import { Mechanic } from "components/content/Mechanic"
import { ProseImage } from "components/content/prose/ProseImage"
import { ProseLink } from "components/content/prose/ProseLink"
import { Tabs } from "components/content/Tabs"
import { Video } from "components/content/Video"
import { getDefaultLayout } from "components/layouts/Default"
import Image from "next/image"
import type { FC, PropsWithChildren, ReactElement } from "react"

const components = {
  a: ProseLink,
  Image,
  ProseImage,
  Tabs,
  Alert,
  Mechanic,
  Video,
  Marker,
}

export const MarkdownLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>
}

export const getMarkdownLayout = (page: ReactElement) =>
  getDefaultLayout(<MarkdownLayout>{page}</MarkdownLayout>)
