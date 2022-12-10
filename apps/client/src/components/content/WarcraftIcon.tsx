import clsx from "clsx"
import type { ImageProps } from "next/image"
import Image from "next/image"
import { useSpell } from "stores/wowhead"

export type WarcraftIconProps = Omit<ImageProps, "id" | "width" | "height" | "alt" | "src"> & {
  id: number
  size?: number
}

export function WarcraftIcon({ id, size, ...props }: WarcraftIconProps) {
  const { data, status } = useSpell(id)

  if (data) {
    return (
      <Image
        src={`https://render-us.worldofwarcraft.com/icons/56/${data.icon}.jpg`}
        width={size || 56}
        height={size || 56}
        alt={data.name}
        {...props}
      />
    )
  } else if (status === "loading") {
    return (
      <div className={clsx("animate-pulse bg-surface-400", `h-[${size}] w-[${size}]`)} {...props} />
    )
  }

  return (
    <Image
      src="https://render-us.worldofwarcraft.com/icons/56/inv_misc_questionmark.jpg"
      width={size || 56}
      height={size || 56}
      alt="Icon Missing"
      {...props}
    />
  )
}
