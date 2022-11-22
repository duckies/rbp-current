import type { Character } from "@rbp/server";
import { CharacterQueryContext } from "features/Characters/queries";
import { $get } from "lib/utils/fetch";

export const lookupCharacter = (ctx: CharacterQueryContext["lookup"]) => {
  const { region, realm, name } = ctx.queryKey[0].character;

  return $get<Character>(`/character/lookup/${region}/${realm}/${name}`);
};
