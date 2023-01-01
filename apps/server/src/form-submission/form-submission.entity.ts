import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core'
import { Form } from '../form/form.entity'
import { FormSubmissionCharacter } from './form-submission-character.entity'

@Entity()
export class FormSubmission {
  [OptionalProps]?: 'createdAt' | 'updatedAt'

  @PrimaryKey()
  id!: number

  @Property({ type: 'json' })
  responses!: Record<string, unknown>

  @ManyToOne(() => Form)
  form!: Form

  @Property({ defaultRaw: 'now()' })
  createdAt: Date = new Date()

  @Property({ onUpdate: () => new Date(), defaultRaw: 'now()' })
  updatedAt: Date = new Date()

  @OneToMany(() => FormSubmissionCharacter, (f) => f.formSubmission)
  characters = new Collection<FormSubmissionCharacter>(this)
}
