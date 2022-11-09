import { Embeddable, Property } from '@mikro-orm/core';
import { CharacterMediaSummary } from '@rbp/battle.net';
import { EndpointStorage } from '../interfaces/endpoint-storage.interface';

type AssetType = 'avatar' | 'inset' | 'main' | 'main-raw';

type AssetMap = {
  [key in AssetType]?: string
};

@Embeddable()
export class CharacterMedia implements EndpointStorage, AssetMap {
  @Property({ nullable: true })
  avatar?: string;

  @Property({ nullable: true })
  inset?: string;

  @Property({ nullable: true })
  main?: string;

  @Property({ nullable: true })
  'main-raw'?: string;

  @Property()
  updatedAt!: Date;

  set(data: CharacterMediaSummary) {
    for (const asset of data.assets) {
      this[asset.key as AssetType] = asset.value;
    }
  }
}
