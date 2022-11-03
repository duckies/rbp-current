import { Embedded, Entity, Enum, Property } from '@mikro-orm/core';
import { RealmSlug, RealmSlugs, Region, Regions } from '@rbp/battle.net';
import { CharacterStatus } from './embeddables/character-status.embeddable';
import { CharacterSummary } from './embeddables/character-summary.embeddable';

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

  @Embedded(() => CharacterSummary)
  summary?: CharacterSummary;
}
