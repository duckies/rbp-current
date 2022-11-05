import type { ProfileOptions } from '../../interfaces';
import type { ProfileEndpoint } from '../profile-api.constants';
import type { CharacterMediaSummary } from './character-media-summary.interface';
import type { CharacterMythicKeystoneProfile } from './character-mythic-keystone-profile-index.interface';
import type { CharacterProfileSummary } from './character-profile-summary.interface';

export interface ProfileEndpointOptions {
  [ProfileEndpoint.CharacterProfileSummary]: ProfileOptions
  [ProfileEndpoint.CharacterMediaSummary]: ProfileOptions
  [ProfileEndpoint.CharacterMythicKeystoneProfile]: ProfileOptions
  [ProfileEndpoint.CharacterMythicKeystoneSeason]: { season: number }
}

export interface ProfileEndpointResponses {
  [ProfileEndpoint.CharacterProfileSummary]: CharacterProfileSummary
  [ProfileEndpoint.CharacterMediaSummary]: CharacterMediaSummary
  [ProfileEndpoint.CharacterMythicKeystoneProfile]: CharacterMythicKeystoneProfile
  [ProfileEndpoint.CharacterMythicKeystoneSeason]: any
}
