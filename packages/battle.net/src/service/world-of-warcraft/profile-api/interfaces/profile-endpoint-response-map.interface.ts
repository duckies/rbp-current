import type { CharacterAchievementsSummary } from './character-achievements-summary.interface'
import type { CharacterMediaSummary } from './character-media-summary.interface'
import type { CharacterMythicKeystoneProfile } from './character-mythic-keystone-profile-index.interface'
import type { CharacterMythicKeystoneSeason } from './character-mythic-keystone-season.interface'
import type { CharacterProfileStatus } from './character-profile-status.interface'
import type { CharacterProfileSummary } from './character-profile-summary.interface'
import type { CharacterRaids } from './character-raids.interface'

export interface ProfileEndpointResponseMap {
  'character-achievements-summary': CharacterAchievementsSummary
  'character-profile-status': CharacterProfileStatus
  'character-profile-summary': CharacterProfileSummary
  'character-media-summary': CharacterMediaSummary
  'character-mythic-keystone-profile': CharacterMythicKeystoneProfile
  'character-mythic-keystone-season': CharacterMythicKeystoneSeason
  'character-raids': CharacterRaids
}
