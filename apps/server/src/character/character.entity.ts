import { Embedded, Entity, Enum, Property } from '@mikro-orm/core';
import { ProfileEndpoint, RealmSlug, RealmSlugs, Region, Regions } from '@rbp/battle.net';
import { CharacterMedia } from './embeddables/character-media.embeddable';
import { CharacterStatus } from './embeddables/character-status.embeddable';
import { CharacterSummary } from './embeddables/character-summary.embeddable';
import { EndpointStorage } from './interfaces/endpoint-storage.interface';

@Entity()
export class Character {
  @Property({ primary: true })
  // @Index({ name: 'character_name_lower', expression: 'alter table `character` add index `lower`(`name`)' })
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
      default:
        throw new Error(`Endpoint ${endpoint} is not yet implemented.`);
    }
  }
}
