import Button from "components/Button"
import type { CardProps } from "components/Card"
import { Card } from "components/Card"
import { IconArrowRight } from "components/icons/ArrowRight"
import { cva } from "cva"
import Image from "next/image"
import type { FC } from "react"

const insetImageCSS = cva(
  "contain absolute top-[-10%] right-[-25%] z-0 m-0 overflow-visible object-cover pl-6",
  {
    variants: {
      style: {
        grayscale: "grayscale",
        glow: "drop-shadow-[0_10px_15px_rgba(249,203,88,0.1)] transition-all group-hover:scale-105 group-hover:drop-shadow-[0_10px_15px_rgba(249,203,88,0.75)] group-hover:saturate-[1.35]",
      },
    },
  }
)

type DocumentCardInsetImageProps = {
  disabled?: boolean
  src: string
}

export const DocumentCardInsetImage: FC<DocumentCardInsetImageProps> = ({ disabled, src }) => {
  return (
    <div className="absolute right-0 top-0 flex h-full w-[150px] lg:w-[300px]">
      <Image
        className={insetImageCSS({ style: disabled ? "grayscale" : "glow" })}
        src={src}
        sizes="(max-width: 640px) 150px, (max-width: 1024px) 300px"
        fill
        alt=""
      />
    </div>
  )
}

type DocumentCardProps = CardProps & {
  title: string
  caption: string
  insetSrc?: string
  disabled?: boolean
  disabledMessage?: string
}

export const DocumentCard: FC<DocumentCardProps> = ({
  title,
  caption,
  href,
  disabled,
  disabledMessage = "🚧 Under Construction 🚧",
  insetSrc,
}) => {
  return (
    <Card className="group relative overflow-hidden" {...(!disabled && { href })}>
      {insetSrc && <DocumentCardInsetImage src={insetSrc} disabled={disabled} />}

      <div className="relative z-10">
        <Card.Title className="text-shadow-md my-3 text-2xl">{title}</Card.Title>
        <Card.Caption className="text-shadow-md">{caption}</Card.Caption>

        {disabled ? (
          <p className="text-yellow-200">{disabledMessage}</p>
        ) : (
          <Button variant="unstyled" className="">
            Read More{" "}
            <IconArrowRight className="relative ml-1.5 h-5 w-5 transition-transform group-hover:translate-x-2" />
          </Button>
        )}
      </div>
    </Card>
  )
}
