import { Embeddable, Property } from '@mikro-orm/core'
import type { CharacterRaids as CharacterRaidsData } from '@rbp/battle.net'
import { EndpointStorage } from '../interfaces/endpoint-storage.interface'

export interface CharacterRaidInstanceModeEncounter {
  id: number
  name: string
  kills: number
  last_kill: Date
}

export interface CharacterRaidInstanceMode {
  difficulty: string
  complete: boolean
  kills: number
  encounters_total: number
  encounters: CharacterRaidInstanceModeEncounter[]
}

export interface CharacterRaidInstance {
  id: number
  name: string
  modes: CharacterRaidInstanceMode[]
}

export interface CharacterRaidExpansion {
  id: number
  name: string
  instances: CharacterRaidInstance[]
}

export interface RaidSummary {
  [name: string]: {
    [difficulty: string]: string
  }
}

@Embeddable()
export class CharacterRaids implements EndpointStorage {
  @Property({ type: 'json', hidden: true })
  expansions!: CharacterRaidExpansion[]

  @Property()
  updatedAt!: Date

  @Property({ persist: false })
  get summary(): RaidSummary {
    return this.latestExpansion?.instances.reduce((instanceSummary, instance) => {
      instanceSummary[instance.name] = instance.modes.reduce((modeSummary, mode) => {
        modeSummary[mode.difficulty] = `${mode.kills}/${mode.encounters_total}`
        return modeSummary
      }, {} as Record<string, any>)
      return instanceSummary
    }, {} as Record<string, any>)
  }

  @Property({ persist: false, hidden: true })
  get latestExpansion() {
    return this.expansions?.reduce((prev, cur) => (prev.id > cur.id ? prev : cur))
  }

  set(data: CharacterRaidsData) {
    // Characters that have never killed anything have no data.
    if (!data.expansions) {
      return
    }

    this.expansions = data.expansions.map(({ expansion, instances }) => ({
      id: expansion.id,
      name: expansion.name,
      instances: instances.map(({ instance, modes }) => ({
        id: instance.id,
        name: instance.name,
        modes: modes.map(({ difficulty, status, progress }) => ({
          difficulty: difficulty.name,
          complete: status.name === 'Complete',
          kills: progress.completed_count,
          encounters_total: progress.total_count,
          encounters: progress.encounters.map(({ encounter, ...meta }) => ({
            id: encounter.id,
            name: encounter.name,
            kills: meta.completed_count,
            last_kill: new Date(meta.last_kill_timestamp),
          })),
        })),
      })),
    }))
  }
}
