export const ProfileEndpoints = [
  'character-achievements-summary',
  'character-profile-status',
  'character-profile-summary',
  'character-media-summary',
  'character-mythic-keystone-profile',
  'character-mythic-keystone-season',
  'character-raids',
] as const

export type ProfileEndpoint = typeof ProfileEndpoints[number]
