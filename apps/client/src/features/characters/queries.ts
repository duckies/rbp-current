import type { FindCharacterDTO } from "@rbp/server"
import { useQuery } from "@tanstack/react-query"
import { lookupCharacter } from "features/characters/api"
import type { QueryContextFromKeys } from "types/queries"

export type CharacterQueryContext = QueryContextFromKeys<typeof characterKeys>

export const characterKeys = {
  all: [{ scope: "characters" }] as const,
  lookup: (character: FindCharacterDTO) =>
    [{ ...characterKeys.all[0], action: "lookup", character }] as const,
}

export const useCharacterLookup = (character: FindCharacterDTO) => {
  return useQuery(characterKeys.lookup(character), lookupCharacter)
}
