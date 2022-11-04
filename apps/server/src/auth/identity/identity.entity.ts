import { Entity, Enum, ManyToOne, PrimaryKeyType, Property } from '@mikro-orm/core';
import { User } from '../../user/user.entity';

export enum Provider {
  BattleNet = 'battle.net',
  Discord = 'discord',
}

@Entity()
export class Identity {
  [PrimaryKeyType]?: [string, Provider];

  @Property({ primary: true })
  id!: string;

  @Enum({ items: () => Provider, primary: true })
  provider!: Provider;

  @Property()
  identifier!: string;

  @Property({ nullable: true })
  avatar?: string;

  @Property({ hidden: true })
  accessToken!: string;

  @Property({ hidden: true })
  refreshToken?: string;

  @Property()
  expiresAt!: Date;

  @ManyToOne(() => User)
  user!: User;
}
