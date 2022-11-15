import { Embedded, Entity, Enum, OptionalProps, PrimaryKeyType, Property } from '@mikro-orm/core';
import { ProfileEndpoint, RealmSlug, RealmSlugs, Region, Regions } from '@rbp/battle.net';
import { CharacterRaids } from './embeddables/characeter-raids.embeddable';
import { CharacterMedia } from './embeddables/character-media.embeddable';
import { CharacterKeystoneProfile } from './embeddables/character-mythic-keystone.embeddable';
import { CharacterStatus } from './embeddables/character-status.embeddable';
import { CharacterSummary } from './embeddables/character-summary.embeddable';
import { EndpointStorage } from './interfaces/endpoint-storage.interface';

export const HordeRaces = [2, 5, 6, 8, 9, 10, 26, 27, 28, 31, 35, 36, 70];

@Entity()
export class Character {
  [PrimaryKeyType]?: [string, RealmSlug, Region];
  [OptionalProps]?: 'avatar';

  @Property({ primary: true })
  name!: string;

  @Enum({ items: () => RealmSlugs, primary: true })
  realm!: RealmSlug;

  @Enum({ items: () => Regions, primary: true })
  region!: Region;

  @Embedded(() => CharacterStatus, { nullable: true })
  status?: CharacterStatus;

  @Embedded(() => CharacterSummary, { nullable: true })
  summary?: CharacterSummary;

  @Embedded(() => CharacterMedia, { nullable: true })
  media?: CharacterMedia;

  @Embedded(() => CharacterKeystoneProfile, { nullable: true })
  keystones?: CharacterKeystoneProfile;

  @Embedded(() => CharacterRaids, { nullable: true })
  progression?: CharacterRaids;

  // https://develop.battle.net/documentation/world-of-warcraft/guides/character-renders
  @Property({ persist: false })
  get avatar() {
    if (this.media?.avatar) {
      return this.media.avatar;
    }
    const race = this.summary?.race.id || HordeRaces[Math.floor(Math.random() * HordeRaces.length)];
    const gender = this.summary ? this.summary.gender === 'Male' ? 0 : 1 : Math.round(Math.random());

    return `https://render.worldofwarcraft.com/shadow/avatar/${race}/${gender}.jpg`;
  }

  getStorage(endpoint: ProfileEndpoint): EndpointStorage | undefined;
  getStorage<C extends boolean | undefined>(endpoint: ProfileEndpoint, create: C): C extends true
    ? EndpointStorage
    : (EndpointStorage | undefined);
  /**
   * Typescript oddity with narrowing requires these overloads or `as any`.
   * @see https://github.com/Microsoft/TypeScript/issues/24929
   */
  getStorage(endpoint: ProfileEndpoint, create?: boolean): EndpointStorage | undefined {
    switch (endpoint) {
      case 'character-profile-status':
        return this.status ?? (create ? (this.status = new CharacterStatus()) : undefined);
      case 'character-profile-summary':
        return this.summary ?? (create ? (this.summary = new CharacterSummary()) : undefined);
      case 'character-media-summary':
        return this.media ?? (create ? (this.media = new CharacterMedia()) : undefined);
      case 'character-mythic-keystone-profile':
      case 'character-mythic-keystone-season':
        return this.keystones ?? (create ? (this.keystones = new CharacterKeystoneProfile()) : undefined);
      case 'character-raids':
        return this.progression ?? (create ? (this.progression = new CharacterRaids()) : undefined);
      default:
        throw new Error(`Endpoint ${endpoint} is not yet implemented.`);
    }
  }

  deleteStorage(endpoint: ProfileEndpoint) {
    switch (endpoint) {
      case 'character-profile-status':
        this.status = undefined;
        break;
      case 'character-profile-summary':
        this.summary = undefined;
        break;
      case 'character-media-summary':
        this.media = undefined;
        break;
      case 'character-mythic-keystone-profile':
        this.keystones = undefined;
        break;
      case 'character-raids':
        this.progression = undefined;
        break;
      default:
        throw new Error(`Endpoint ${endpoint} is not yet implemented.`);
    }
  }
}
