import type { Character } from "@rbp/server"
import type { CharacterQueryContext } from "features/characters/queries"
import { $put } from "lib/utils/fetch"

export const lookupCharacter = (ctx: CharacterQueryContext["lookup"]) => {
  const { region, realm, name } = ctx.queryKey[0].character

  return $put<Character>(`/character/${region}/${realm}/${name}`)
}
