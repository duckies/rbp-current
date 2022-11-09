import type { ProfileEndpoint } from '../profile-api.constants';
import type { CharacterMediaSummary } from './character-media-summary.interface';
import type { CharacterMythicKeystoneProfile } from './character-mythic-keystone-profile-index.interface';
import type { CharacterProfileStatus } from './character-profile-status.interface';
import type { CharacterProfileSummary } from './character-profile-summary.interface';

export type ProfileEndpointResponseMapType<T extends ProfileEndpoint> = {
  [K in T]: any;
};

export interface ProfileEndpointResponseMap extends ProfileEndpointResponseMapType<ProfileEndpoint> {
  'character-profile-status': CharacterProfileStatus
  'character-profile-summary': CharacterProfileSummary
  'character-media-summary': CharacterMediaSummary
  'character-mythic-keystone-profile': CharacterMythicKeystoneProfile
}
