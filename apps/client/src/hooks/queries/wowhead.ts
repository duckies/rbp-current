import { useQuery } from "@tanstack/react-query"
import { $get } from "utils/fetch"

export function useSpell(id: number) {
  return useQuery(
    ["wowhead", "spell", id],
    () =>
      $get<{ icon: string; name: string }>(`https://nether.wowhead.com/tooltip/spell/${id}`, {}),
    {
      staleTime: Infinity,
    }
  )
}
