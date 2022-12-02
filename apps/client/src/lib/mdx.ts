import type { Expansion } from "@rbp/battle.net/constants"
import { Expansions, Instances } from "@rbp/battle.net/constants"
import slug from "slug"

export function getPathExpansion(path: string): Expansion | null {
  const expansionSlug = path.split("/")[1]
  return Expansions.find((e) => slug(e) === expansionSlug) || null
}

export function getPathInstance(path: string): string | null {
  const expansion = getPathExpansion(path)

  if (!expansion) {
    return null
  }

  const instances = Instances[expansion]
  const instanceSlug = path.split("/")[2]
  return instances?.find((i) => slug(i) === instanceSlug) || null
}
