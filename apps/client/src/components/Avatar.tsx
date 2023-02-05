"use client"

import type { ImageProps } from "next/image"
import Image from "next/image"
import { cn } from "utils/cn"

type AvatarProps = Omit<ImageProps, "src"> & {
  src: string
  size?: number
}

export function Avatar({ src, size = 80, className, ...props }: AvatarProps) {
  return (
    <div className={cn("overflow-hidden rounded-full", className)}>
      <Image src={src} height={size} width={size} {...props} />
    </div>
  )
}
