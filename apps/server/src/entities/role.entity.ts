import { Collection, Entity, ManyToMany, OneToMany, PrimaryKeyType, Property } from '@mikro-orm/core';
import { Permission } from './permission.entity';
import { User } from './user.entity';

@Entity()
export class Role {
  [PrimaryKeyType]?: string;

  @Property({ primary: true })
  name!: string;

  @ManyToMany(() => User, u => u.roles)
  users = new Collection<User>(this);

  @OneToMany(() => Permission, p => p.role)
  permissions = new Collection<Permission>(this);
}
