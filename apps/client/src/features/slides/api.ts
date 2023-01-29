import type { Slide } from "@rbp/server"
import { $get } from "lib/utils/fetch"

export function getSlides() {
  return $get<Slide[]>("/slide")
}
