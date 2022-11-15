import { Embeddable, Embedded, Property } from '@mikro-orm/core';
import { CharacterProfileSummary } from '@rbp/battle.net';
import { EndpointStorage } from '../interfaces/endpoint-storage.interface';

@Embeddable()
export class NamedResource {
  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }

  @Property()
  id!: number;

  @Property()
  name!: string;
}

@Embeddable()
export class CharacterSummary implements EndpointStorage {
  @Property()
  gender!: string;

  @Property()
  faction!: string;

  @Embedded(() => NamedResource)
  race!: NamedResource;

  @Embedded(() => NamedResource)
  class!: NamedResource;

  @Embedded(() => NamedResource, { nullable: true })
  spec?: NamedResource;

  @Property()
  level!: number;

  @Property({ type: 'smallint' })
  equipped_item_level!: number;

  @Property({ type: 'smallint' })
  average_item_level!: number;

  @Property()
  achievement_points!: number;

  @Property({ nullable: true })
  title?: string;

  @Property()
  logoutAt!: Date;

  @Property()
  updatedAt!: Date;

  public set(data: CharacterProfileSummary) {
    this.gender = data.gender.name;
    this.faction = data.faction.name;
    this.race = new NamedResource(data.race.id, data.race.name);
    this.class = new NamedResource(data.character_class.id, data.character_class.name);
    this.spec = data.active_spec ? new NamedResource(data.active_spec.id, data.active_spec.name) : undefined;
    this.level = data.level;
    this.equipped_item_level = data.equipped_item_level;
    this.average_item_level = data.average_item_level;
    this.achievement_points = data.achievement_points;
    this.title = data.active_title ? data.active_title.display_string : undefined;
    this.logoutAt = new Date(data.last_login_timestamp);
  }
}
