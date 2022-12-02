import { KeyNameId, LinkedResource } from '../../interfaces'

export interface AchievementCriteria {
  id: number
  is_completed: boolean
  child_criteria: any // TODO: Incomplete types.
}

export interface Achievement {
  id: number
  achievement: KeyNameId
  criteria: AchievementCriteria
  completed_timestamp?: number
}

export interface CharacterAchievementsSummary extends LinkedResource {
  total_quantity: number
  total_points: number
  achievements: Achievement[]
}
