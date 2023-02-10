import { Entity, PrimaryKey, PrimaryKeyType, Property } from '@mikro-orm/core'

@Entity()
export class Store<K extends string = any, V = any> {
  [PrimaryKeyType]?: [string]

  @PrimaryKey({ type: 'varchar', primary: true })
  scope!: string

  @Property({ type: 'string', primary: true })
  key!: K

  @Property({ type: 'json', nullable: true })
  value?: V
}
