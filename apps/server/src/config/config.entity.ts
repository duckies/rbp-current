import { Entity, PrimaryKeyType, Property } from '@mikro-orm/core'

@Entity()
export class Config<K = string, V = any> {
  [PrimaryKeyType]?: string

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }

  @Property({ primary: true, type: 'varchar' })
  key!: K

  @Property({ nullable: true, type: 'json' })
  value?: V
}
