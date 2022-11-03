import { Embeddable, Property } from '@mikro-orm/core';

@Embeddable()
export class CharacterStatus {
  @Property()
  id!: number;

  @Property({ nullable: true })
  updatedAt?: Date;
}
