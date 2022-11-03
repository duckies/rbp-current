import { Entity, Enum, ManyToOne, PrimaryKey, Property, Unique } from '@mikro-orm/core';
import { Role } from './role.entity';

export enum Subject {
  User = 'user',
  Identity = 'identity',
  Role = 'role',
  Permission = 'permission',
  Slide = 'slide',
  all = 'all',
}

export type Subjects = `${Subject}`;

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type Actions = `${Action}`;

@Entity()
@Unique({ properties: ['subject', 'action'] })
export class Permission {
  @PrimaryKey()
  id!: number;

  @Enum(() => Subject)
  subject!: Subject;

  @Enum(() => Action)
  action!: Action;

  @Property({ default: false })
  inverted?: boolean;

  @Property({ nullable: true })
  reason?: string;

  @Property({ type: 'jsonb' })
  conditions?: Record<string, unknown>;

  @ManyToOne(() => Role)
  role!: Role;
}
