import { Entity, Enum, ManyToOne, OptionalProps, Property } from '@mikro-orm/core';
import { RealmSlug, RealmSlugs, Region, Regions } from '@rbp/battle.net';
import {
  isArray,
  isBoolean,
  isNumber,
  isPOJO,
  isString,
  isStringArray,
} from '@rbp/shared';
import { v4 as uuidv4 } from 'uuid';
import {
  CreateCharacterFieldOptionsDTO,
  CreateComboboxFieldOptionsDTO,
  CreateFieldOptionsDTO,
  CreateRadioFieldOptionsDTO,
} from '../form-field/dto/create-field-options.dto';
import { Form } from './form.entity';

export enum FieldType {
  Text = 'text',
  Number = 'number',
  Checkbox = 'checkbox',
  Radio = 'radio',
  Select = 'select',
  Combobox = 'combobox',
  Character = 'character',
}

@Entity()
export class FormField {
  [OptionalProps]?: 'createdAt' | 'updatedAt';

  @Property({ primary: true })
  id: string = uuidv4();

  @Property()
  label!: string;

  @Enum(() => FieldType)
  type!: FieldType;

  @Property({ nullable: true })
  description?: string;

  @Property({ default: false })
  required?: boolean;

  @Property({ nullable: true, type: 'jsonb' })
  options?: CreateFieldOptionsDTO;

  @Property({ type: 'smallint' })
  order!: number;

  @Property({ defaultRaw: 'now()' })
  createdAt!: Date;

  @Property({ onUpdate: () => new Date(), defaultRaw: 'now()' })
  updatedAt!: Date;

  @ManyToOne(() => Form)
  form!: Form;

  /**
   * Validates the answer against the field type.
   *
   * 😠 I'm not smart enough to find a reasonable type discriminator for this.
   */
  public isAnswerValid(answer: unknown): boolean {
    switch (this.type) {
      case FieldType.Text:
        return isString(answer);
      case FieldType.Number:
        return isNumber(answer);
      case FieldType.Checkbox:
        return isBoolean(answer);
      case FieldType.Radio:
        return (
          isString(answer)
          && (this.options as CreateRadioFieldOptionsDTO).items.some(
            i => i.value === answer,
          )
        );
      case FieldType.Select:
        if (isString(answer)) {
          return (this.options as CreateRadioFieldOptionsDTO).items.some(
            i => i.value === answer,
          );
        }
        else if (isArray(answer)) {
          return answer.every(a =>
            (this.options as CreateRadioFieldOptionsDTO).items.some(
              i => i.value === a,
            ),
          );
        }
        return false;
      case FieldType.Character:
        return this.isCharacterAnswerValid(this.options || {}, answer);
      case FieldType.Combobox: {
        const options = this.options as CreateComboboxFieldOptionsDTO;

        if (isString(answer)) {
          return (
            options.custom || options.items.some(i => i.value === answer)
          );
        }
        else if (isStringArray(answer)) {
          return (
            !!options.multiple
            && (!!options.custom
              || answer.every(a => options.items.some(i => i.value === a)))
          );
        }

        return false;
      }
    }
  }

  private isValidCharacter(
    answer: unknown,
  ): answer is { name: string; realm: RealmSlug; region: Region; main?: true } {
    return (
      isPOJO(answer)
      && isString(answer.name)
      && RealmSlugs.includes(answer.realm as any)
      && Regions.includes(answer.region as any)
      && (answer.main === undefined || answer.main === true)
    );
  }

  private isCharacterAnswerValid(
    options: CreateCharacterFieldOptionsDTO,
    answer: unknown,
  ) {
    const answers = isArray(answer) ? answer : [answer];

    // A. Check if multiple characters are allowed.
    if (!options.multiple && answers.length > 1) {
      return false;
    }
    // B. We _can_ have multiple characters, so make sure each character is sound.
    else if (!answers.every(a => this.isValidCharacter(a))) {
      return false;
    }

    // C. Make sure one main is set if required, and we cannot have more than `1` main.
    const mains = answers.filter(a => a.main);
    if ((options.requireMain && mains.length !== 1) || mains.length > 1) {
      return false;
    }

    return true;
  }
}
