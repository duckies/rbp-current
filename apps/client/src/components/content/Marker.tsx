import Image from "next/image"
import Circle from "public/images/markers/circle.png"
import Cross from "public/images/markers/cross.png"
import Diamond from "public/images/markers/diamond.png"
import Moon from "public/images/markers/moon.png"
import Skull from "public/images/markers/skull.png"
import Square from "public/images/markers/square.png"
import Star from "public/images/markers/star.png"
import Triangle from "public/images/markers/triangle.png"

const Markers = {
  moon: Moon,
  skull: Skull,
  square: Square,
  triangle: Triangle,
  diamond: Diamond,
  cross: Cross,
  star: Star,
  circle: Circle,
}

type MarkerProps = {
  type: keyof typeof Markers
}
export const Marker = ({ type }: MarkerProps) => {
  const name = type.charAt(0).toUpperCase() + type.slice(1)

  return (
    <span className="not-prose">
      <Image
        className="inline-block transition-transform will-change-transform hover:scale-105 hover:animate-pulse"
        src={Markers[type]}
        alt={`${name} Raid Marker`}
        width="22"
        height="22"
      />
    </span>
  )
}
