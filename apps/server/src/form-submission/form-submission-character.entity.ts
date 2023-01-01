import { Entity, ManyToOne, PrimaryKeyType, Property, Unique } from '@mikro-orm/core'
import { RealmSlug, Region } from '@rbp/battle.net'
import { Character } from '../character/character.entity'
import { FormSubmission } from './form-submission.entity'

@Entity()
@Unique({ properties: ['character', 'formSubmission', 'main'] })
export class FormSubmissionCharacter {
  [PrimaryKeyType]?: [[string, RealmSlug, Region], number, boolean]

  @ManyToOne(() => Character, { primary: true })
  character!: Character

  @ManyToOne(() => FormSubmission, { primary: true })
  formSubmission!: FormSubmission

  @Property()
  main!: boolean

  constructor(character: Character, formSubmission: FormSubmission, main?: boolean) {
    this.character = character
    this.formSubmission = formSubmission
    this.main = main ?? false
  }
}
