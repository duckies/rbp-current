import { Entity, PrimaryKey, Property } from '@mikro-orm/core'

@Entity()
export class Slide {
  @PrimaryKey()
  id!: number

  @Property()
  title!: string

  @Property({ nullable: true })
  caption?: string

  @Property()
  url!: string

  @Property({ defaultRaw: 'now()' })
  createdAt?: Date

  @Property({ onUpdate: () => new Date(), defaultRaw: 'now()' })
  updatedAt?: Date
}
