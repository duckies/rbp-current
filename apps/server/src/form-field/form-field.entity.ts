import { Entity, Enum, ManyToOne, OptionalProps, Property } from '@mikro-orm/core'
import { RealmSlug, RealmSlugs, Region, Regions } from '@rbp/battle.net'
import { isArray, isBoolean, isNumber, isPOJO, isString, isStringArray } from '@rbp/shared'
import { v4 as uuidv4 } from 'uuid'
import { Form } from '../form/form.entity'
import {
  CreateCharacterFieldOptionsDTO,
  CreateFieldOptionsDTO,
  CreateRadioFieldOptionsDTO,
} from './dto/create-field-options.dto'
import { FieldDiscriminator } from './interfaces/form-field.interface'

export const FieldTypes = [
  'text',
  'number',
  'checkbox',
  'radio',
  'select',
  'combobox',
  'character',
] as const

export type FieldType = typeof FieldTypes[number]

@Entity()
export class FormField {
  [OptionalProps]?: 'createdAt' | 'updatedAt'

  @Property({ primary: true })
  id: string = uuidv4()

  @Property()
  label!: string

  @Enum(() => FieldTypes)
  type!: FieldType

  @Property({ nullable: true })
  description?: string

  @Property({ default: false })
  required?: boolean

  @Property({ nullable: true, type: 'json' })
  options?: CreateFieldOptionsDTO

  @Property({ type: 'smallint' })
  order!: number

  @Property({ defaultRaw: 'now()' })
  createdAt!: Date

  @Property({ onUpdate: () => new Date(), defaultRaw: 'now()' })
  updatedAt!: Date

  @ManyToOne(() => Form)
  form!: Form

  /**
   * Validates the answer against the field type.
   *
   * 😠 I'm not smart enough to find a reasonable type discriminator for this.
   */
  public isAnswerValid(answer: unknown): boolean {
    // 🤔 Is there some better way to describe the class as a discriminated union?
    const field = this as FieldDiscriminator

    switch (field.type) {
      case 'text':
        return isString(answer) && answer.length > 0
      case 'number':
        return isNumber(answer)
      case 'checkbox': {
        if (field.options?.noFalse) {
          return answer === true
        }

        return isBoolean(answer)
      }
      case 'radio':
        return isString(answer) && field.options.items.some((i) => i.value === answer)
      case 'select': {
        if (isString(answer)) {
          return field.options.items.some((i) => i.value === answer)
        } else if (isArray(answer) && answer.length && field.options.multiple) {
          return answer.every((a) =>
            (this.options as CreateRadioFieldOptionsDTO).items.some((i) => i.value === a)
          )
        }
        return false
      }
      case 'character':
        return this.isCharacterAnswerValid(field.options || {}, answer)
      case 'combobox': {
        if (isString(answer)) {
          return field.options.custom || field.options.items.some((i) => i.value === answer)
        } else if (isStringArray(answer)) {
          return (
            !!field.options.multiple &&
            (!!field.options.custom ||
              answer.every((a) => field.options.items.some((i) => i.value === a)))
          )
        }

        return false
      }
    }
  }

  /**
   * I am unhappy with hacking together object validation instead of using a
   * library such as `zod`, but I don't want to add another dependency. In theory
   * I can cobble together something with `class-validator` but it would need
   * to fetch the fields from the database, which is not ideal.
   */
  private isValidCharacter(
    answer: unknown
  ): answer is { name: string; realm: RealmSlug; region: Region; main?: true } {
    return (
      isPOJO(answer) &&
      isString(answer.name) &&
      answer.name.length >= 2 &&
      answer.name.length <= 12 &&
      !answer.name.includes(' ') &&
      RealmSlugs.includes(answer.realm as any) &&
      Regions.includes(answer.region as any) &&
      (answer.main === undefined || answer.main === true)
    )
  }

  private isCharacterAnswerValid(options: CreateCharacterFieldOptionsDTO, answer: unknown) {
    const answers = isArray(answer) ? answer : [answer]

    // No characters!
    if (answers.length === 0) {
      return false
    }

    // A. Check if multiple characters are allowed.
    if (!options.multiple && answers.length > 1) {
      return false
    }
    // B. We _can_ have multiple characters, so make sure each character is sound.
    else if (!answers.every((a) => this.isValidCharacter(a))) {
      return false
    }

    // C. Make sure one main is set if required, and we cannot have more than `1` main.
    const mains = answers.filter((a) => a.main)
    if ((options.requireMain && mains.length !== 1) || mains.length > 1) {
      return false
    }

    return true
  }
}
