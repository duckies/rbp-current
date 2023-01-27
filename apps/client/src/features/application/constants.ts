import { RealmMap, Regions } from "@rbp/battle.net/constants"

export const RegionItems = Regions.map((r) => ({ text: r.toUpperCase(), value: r }))

export const RealmItems = Object.entries(RealmMap)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([text, value]) => ({
    text,
    value,
  }))
