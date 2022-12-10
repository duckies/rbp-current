import type { ImageProps } from "next/image"
import Image from "next/image"
import type { FC } from "react"

export const ProseImage: FC<ImageProps> = (props) => {
  return <Image className="rounded-lg shadow-lg" {...props} />
}
