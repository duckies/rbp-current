import { MDXProvider } from "@mdx-js/react"
import { Difficulty, DifficultyDropdown } from "components/content/Difficulty"
import { Marker } from "components/content/Marker"
import { ProseImage } from "components/content/prose/ProseImage"
import { ProseLink } from "components/content/prose/ProseLink"
import { Video } from "components/content/Video"
import { getDefaultLayout } from "components/layouts/Default"
import dynamic from "next/dynamic"
import Image from "next/image"
import type { FC, PropsWithChildren, ReactElement } from "react"

const DynamicMechanic = dynamic(() =>
  import("../content/Mechanic").then((module) => module.Mechanic)
)

const DynamicTabs = dynamic(() => import("../content/Tabs").then((module) => module.Tabs))
const DynamicTab = dynamic(() => import("../content/Tabs").then((module) => module.Tab))
const DynamicAlert = dynamic(() => import("../content/Alert").then((module) => module.Alert))

const components = {
  a: ProseLink as any,
  Image,
  ProseImage,
  Tabs: DynamicTabs,
  Tab: DynamicTab,
  Alert: DynamicAlert,
  Mechanic: DynamicMechanic,
  Video,
  Marker,
  DifficultyDropdown,
  Difficulty,
}

export const MarkdownLayout: FC<PropsWithChildren<{}>> = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>
}

export const getMarkdownLayout = (page: ReactElement) =>
  getDefaultLayout(<MarkdownLayout>{page}</MarkdownLayout>)
