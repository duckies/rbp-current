import { Embeddable, Property } from '@mikro-orm/core'
import { Achievement, CharacterAchievementsSummary } from '@rbp/battle.net'
import { entries, isNumber } from '@rbp/shared'
import { Achievements, Expansion, ExpansionInstanceAchievements } from '../character.constants'
import { EndpointStorage } from '../interfaces/endpoint-storage.interface'

export interface ExpansionInstance extends ExpansionInstanceAchievements {
  name: string
}

export interface ExpansionAchievements {
  name: Expansion
  instances: ExpansionInstance[]
}

@Embeddable()
export class CharacterAchievements implements EndpointStorage {
  @Property({ type: 'json' })
  expansions: ExpansionAchievements[] = []

  @Property()
  updatedAt!: Date

  set(data: CharacterAchievementsSummary) {
    const completed = new Map<number, Required<Achievement>>()

    for (const achievement of data.achievements) {
      if (isNumber(achievement.completed_timestamp)) {
        completed.set(achievement.id, achievement as Required<Achievement>)
      }
    }

    const expansions: ExpansionAchievements[] = []
    for (const [expansionName, instances] of entries(Achievements)) {
      const expansion: ExpansionAchievements = { name: expansionName as Expansion, instances: [] }

      for (const [instanceName, achievements] of entries(instances!)) {
        const instance = {
          name: instanceName,
          ...Object.entries(achievements).map(([name, id]) => ({ [name]: completed.has(id) })),
        } as unknown as ExpansionInstance

        expansion.instances.push(instance)
      }

      expansions.push(expansion)
    }

    this.updatedAt = new Date()
  }
}
