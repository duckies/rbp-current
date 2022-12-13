import type { ImageProps } from "next/image"
import Image from "next/image"
import type { FC } from "react"

export const ProseImage: FC<ImageProps> = (props) => {
  const { alt = "", ...imageProps } = props

  return <Image className="select-none rounded-lg shadow-xl" alt={alt} {...imageProps} />
}
