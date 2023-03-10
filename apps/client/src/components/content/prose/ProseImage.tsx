import type { ImageProps } from "next/image"
import Image from "next/image"
import { cn } from "utils/cn"

type ProseImageProps = ImageProps & {
  float?: "left" | "right"
}

export function ProseImage(props: ProseImageProps) {
  const { alt = "", float, className, ...imageProps } = props

  return (
    <Image
      className={cn(
        "select-none rounded-lg shadow-xl [&:not(:first-child)]:my-6",
        float === "left" && "float-left",
        float === "right" && "float-right",
        className
      )}
      alt={alt}
      {...imageProps}
    />
  )
}
