import type { Character, FindCharacterDTO } from "@rbp/server"
import { $get } from "utils/fetch"

export function getCharacter({ name, realm, region }: FindCharacterDTO) {
  return $get<Character>(`/character/lookup/${region}/${realm}/${name}`)
}
