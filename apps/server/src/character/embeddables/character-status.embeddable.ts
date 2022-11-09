import { Embeddable, Property } from '@mikro-orm/core';
import { CharacterProfileStatus } from '@rbp/battle.net';
import { EndpointStorage } from '../interfaces/endpoint-storage.interface';

@Embeddable()
export class CharacterStatus implements EndpointStorage {
  @Property()
  id!: number;

  @Property()
  updatedAt!: Date;

  set(data: CharacterProfileStatus) {
    this.id = data.id;
  }
}
