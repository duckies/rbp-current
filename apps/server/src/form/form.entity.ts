import { Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { FormField } from '../form-field/form-field.entity'

@Entity()
export class Form {
  @PrimaryKey()
  id!: number

  @Property()
  title!: string

  @Property({ default: false })
  closed?: boolean

  @OneToMany(() => FormField, (f) => f.form, { eager: true })
  fields = new Collection<FormField<any>>(this)
}
