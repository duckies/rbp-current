export const ProfileEndpoints = [
  'character-profile-status',
  'character-profile-summary',
  'character-media-summary',
  'character-mythic-keystone-profile',
  'character-mythic-keystone-season',
] as const;

export type ProfileEndpoint = typeof ProfileEndpoints[number];
