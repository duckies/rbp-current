import { Embeddable, Embedded, Property } from '@mikro-orm/core';

@Embeddable()
export class CharacterSummaryRace {
  @Property()
  id!: number;

  @Property()
  race!: string;
}

@Embeddable()
export class CharacterSummarySpec {
  @Property()
  id!: number;

  @Property()
  name!: string;
}

@Embeddable()
export class CharacterSummary {
  @Property()
  gender!: string;

  @Property()
  faction!: string;

  @Embedded(() => CharacterSummaryRace)
  race!: CharacterSummaryRace;

  @Embedded(() => CharacterSummarySpec, { nullable: true })
  spec?: CharacterSummarySpec;

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
  updatedAt: Date = new Date();
}
