import type { Slide } from "@rbp/server"
import { $get } from "utils/fetch"

export function getSlides() {
  return $get<Slide[]>("/slide")
}
