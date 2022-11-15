import { Embeddable, Embedded, Property } from '@mikro-orm/core';
import { CharacterMythicKeystoneProfile, CharacterMythicKeystoneSeason, Color, KeystoneRun } from '@rbp/battle.net';
import { EndpointStorage } from '../interfaces/endpoint-storage.interface';

@Embeddable()
export class CharacterKeystoneSeason {
  constructor(
    id: number,
    color: Color,
    rating: number,
    bestRuns: KeystoneRun[],
  ) {
    this.id = id;
    this.color = color;
    this.rating = rating;
    this.bestRuns = bestRuns;
  }

  @Property()
  id!: number;

  @Property({ type: 'json' })
  color!: Color;

  @Property({ type: 'smallint' })
  rating!: number;

  @Property({ type: 'json', nullable: true })
  bestRuns?: KeystoneRun[];
}

@Embeddable()
export class CharacterKeystoneProfile implements EndpointStorage {
  @Embedded(() => CharacterKeystoneSeason, { array: true })
  seasons!: CharacterKeystoneSeason[];

  @Property({ nullable: true })
  rating?: number;

  @Property({ type: 'json', nullable: true })
  color?: Color;

  @Property()
  updatedAt!: Date;

  set(data: CharacterMythicKeystoneSeason | CharacterMythicKeystoneProfile) {
    if ('current_mythic_rating' in data) {
      this.rating = data.current_mythic_rating?.rating;
      this.color = data.current_mythic_rating?.color;
    }
    else if ('season' in data) {
      const season = this.seasons.find(s => s.id === data.season.id);

      if (season) {
        season.rating = data.mythic_rating.rating;
        season.color = data.mythic_rating.color;
        season.bestRuns = data.best_runs;
      }
      else {
        this.seasons.push(new CharacterKeystoneSeason(
          data.season.id,
          data.mythic_rating.color,
          data.mythic_rating.rating,
          data.best_runs,
        ));
      }
    }
  }
}
