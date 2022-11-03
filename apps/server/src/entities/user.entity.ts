import { Collection, Entity, ManyToMany, OneToMany, PrimaryKey } from '@mikro-orm/core';
import { Identity } from './identity.entity';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @OneToMany(() => Identity, i => i.user)
  identities = new Collection<Identity>(this);

  @ManyToMany(() => Role)
  roles = new Collection<Role>(this);
}
