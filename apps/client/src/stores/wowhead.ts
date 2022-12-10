import { useQuery } from "@tanstack/react-query"
import { $get } from "lib/utils/fetch"

export const useSpell = (id: number) => {
  return useQuery(
    ["wowhead", "spell", id],
    () =>
      $get<{ icon: string; name: string }>(`https://nether.wowhead.com/tooltip/spell/${id}`, {}),
    {
      staleTime: Infinity,
    }
  )
}
