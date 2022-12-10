import type { FC } from "react"

type VideoProps = {
  src: string
}

export const Video: FC<VideoProps> = ({ src }) => {
  const id = src.match(/\?v=([^&]*)/)?.[1]
  const url = `https://www.youtube-nocookie.com/embed/${id}`

  return (
    <iframe
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="aspect-video w-full rounded-lg shadow-lg"
      src={url}
    />
  )
}
