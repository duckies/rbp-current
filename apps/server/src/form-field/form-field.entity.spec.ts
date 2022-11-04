import { describe, expect, it } from 'vitest';
import {
  CreateCharacterFieldOptionsDTO,
  CreateSelectFieldOptionsDTO,
} from './dto/create-field-options.dto';
import { FieldType, FormField } from './form-field.entity';

describe('FormField (Entity)', () => {
  it('should require string responses for text fields', () => {
    const field = new FormField();
    field.type = FieldType.Text;

    expect(field.isAnswerValid(null)).toBe(false);
    expect(field.isAnswerValid(undefined)).toBe(false);
    expect(field.isAnswerValid(1)).toBe(false);
    expect(field.isAnswerValid(false)).toBe(false);
    expect(field.isAnswerValid({})).toBe(false);
    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid('')).toBe(false);
    expect(field.isAnswerValid('Lorem Ipsum')).toBe(true);
  });

  it('should require number responses for number fields', () => {
    const field = new FormField();
    field.type = FieldType.Number;

    expect(field.isAnswerValid(null)).toBe(false);
    expect(field.isAnswerValid(undefined)).toBe(false);
    expect(field.isAnswerValid('')).toBe(false);
    expect(field.isAnswerValid('Lorem Ipsum')).toBe(false);
    expect(field.isAnswerValid(false)).toBe(false);
    expect(field.isAnswerValid({})).toBe(false);
    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid(NaN)).toBe(false);
    expect(field.isAnswerValid(1)).toBe(true);
  });

  it('should require boolean responses for checkbox fields', () => {
    const field = new FormField();
    field.type = FieldType.Checkbox;

    expect(field.isAnswerValid(null)).toBe(false);
    expect(field.isAnswerValid(undefined)).toBe(false);
    expect(field.isAnswerValid('')).toBe(false);
    expect(field.isAnswerValid('Lorem Ipsum')).toBe(false);
    expect(field.isAnswerValid(false)).toBe(true);
    expect(field.isAnswerValid(true)).toBe(true);
    expect(field.isAnswerValid({})).toBe(false);
    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid(NaN)).toBe(false);
    expect(field.isAnswerValid(1)).toBe(false);
  });

  it('should reject anything but `true` for `noFalse` checkbox fields', () => {
    const field = new FormField();
    field.type = FieldType.Checkbox;
    field.options = { noFalse: true };

    expect(field.isAnswerValid(null)).toBe(false);
    expect(field.isAnswerValid(undefined)).toBe(false);
    expect(field.isAnswerValid('')).toBe(false);
    expect(field.isAnswerValid('Lorem Ipsum')).toBe(false);
    expect(field.isAnswerValid(false)).toBe(false);
    expect(field.isAnswerValid({})).toBe(false);
    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid(NaN)).toBe(false);
    expect(field.isAnswerValid(1)).toBe(false);
    expect(field.isAnswerValid(true)).toBe(true);
  });

  it('should require a valid item selection for radio fields', () => {
    const field = new FormField();
    field.type = FieldType.Radio;
    field.options = {
      items: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Coconut', value: 'coconut' },
      ],
    };

    expect(field.isAnswerValid(null)).toBe(false);
    expect(field.isAnswerValid(undefined)).toBe(false);
    expect(field.isAnswerValid('')).toBe(false);
    expect(field.isAnswerValid('Lorem Ipsum')).toBe(false);
    expect(field.isAnswerValid(false)).toBe(false);
    expect(field.isAnswerValid({})).toBe(false);
    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid(NaN)).toBe(false);
    expect(field.isAnswerValid(1)).toBe(false);
    expect(field.isAnswerValid('apple')).toBe(true);
    expect(field.isAnswerValid('banana')).toBe(true);
    expect(field.isAnswerValid('coconut')).toBe(true);
    expect(field.isAnswerValid('durian')).toBe(false);
    expect(field.isAnswerValid('Apple')).toBe(false);
  });

  it('should require a valid item selection for select fields', () => {
    const field = new FormField();
    field.type = FieldType.Select;
    field.options = {
      items: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Coconut', value: 'coconut' },
      ],
    };

    expect(field.isAnswerValid(null)).toBe(false);
    expect(field.isAnswerValid(undefined)).toBe(false);
    expect(field.isAnswerValid('')).toBe(false);
    expect(field.isAnswerValid('Lorem Ipsum')).toBe(false);
    expect(field.isAnswerValid(false)).toBe(false);
    expect(field.isAnswerValid({})).toBe(false);
    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid(['apple'])).toBe(false);
    expect(field.isAnswerValid(NaN)).toBe(false);
    expect(field.isAnswerValid(1)).toBe(false);
    expect(field.isAnswerValid('apple')).toBe(true);
    expect(field.isAnswerValid('banana')).toBe(true);
    expect(field.isAnswerValid('coconut')).toBe(true);
    expect(field.isAnswerValid('durian')).toBe(false);
    expect(field.isAnswerValid('Apple')).toBe(false);
  });

  it('should require valid item selection(s) for multi-select fields', () => {
    const field = new FormField();
    field.type = FieldType.Select;
    field.options = {
      multiple: true,
      items: [
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' },
        { label: 'Coconut', value: 'coconut' },
      ],
    } as CreateSelectFieldOptionsDTO;

    expect(field.isAnswerValid(null)).toBe(false);
    expect(field.isAnswerValid(undefined)).toBe(false);
    expect(field.isAnswerValid('')).toBe(false);
    expect(field.isAnswerValid('Lorem Ipsum')).toBe(false);
    expect(field.isAnswerValid(false)).toBe(false);
    expect(field.isAnswerValid({})).toBe(false);
    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid(NaN)).toBe(false);
    expect(field.isAnswerValid(1)).toBe(false);
    expect(field.isAnswerValid('apple')).toBe(true);
    expect(field.isAnswerValid('banana')).toBe(true);
    expect(field.isAnswerValid('coconut')).toBe(true);
    expect(field.isAnswerValid('durian')).toBe(false);
    expect(field.isAnswerValid('Apple')).toBe(false);
    expect(field.isAnswerValid(['apple'])).toBe(true);
    expect(field.isAnswerValid(['banana', 'apple'])).toBe(true);
    expect(field.isAnswerValid(['banana', 'apple', 'durian'])).toBe(false);
    expect(field.isAnswerValid(['banana', 'apple', 1223])).toBe(false);
  });

  it('should validate character field input shape', () => {
    const field = new FormField();
    field.type = FieldType.Character;

    const validAnswer = {
      name: 'Duckys',
      realm: 'area-52',
      region: 'us',
    };

    expect(field.isAnswerValid(validAnswer)).toBe(true);
    expect(field.isAnswerValid({ ...validAnswer, name: '' })).toBe(false);
    expect(field.isAnswerValid({ ...validAnswer, name: 'D' })).toBe(false);
    expect(field.isAnswerValid({ ...validAnswer, name: 'Duc kys' })).toBe(
      false,
    );
    expect(field.isAnswerValid({ ...validAnswer, realm: 'area 52' })).toBe(
      false,
    );
    expect(field.isAnswerValid({ ...validAnswer, region: 'eyy' })).toBe(false);
  });

  it('should enforce main character option', () => {
    const field = new FormField();
    field.type = FieldType.Character;
    field.options = { requireMain: true } as CreateCharacterFieldOptionsDTO;

    const validAnswer = {
      name: 'Pteroducktyl',
      realm: 'kelthuzad',
      region: 'eu',
      main: true,
    };

    expect(field.isAnswerValid(validAnswer)).toBe(true);
    expect(field.isAnswerValid({ ...validAnswer, main: undefined })).toBe(
      false,
    );
  });

  it('should validate multi-character field input shape', () => {
    const field = new FormField();
    field.type = FieldType.Character;
    field.options = { multiple: true } as CreateCharacterFieldOptionsDTO;

    const characters = [
      { name: 'Duckys', realm: 'area-52', region: 'us' },
      { name: 'Pteroducktyl', realm: 'kelthuzad', region: 'eu' },
      { name: 'Bananaduck', realm: 'illidan', region: 'us' },
    ];

    expect(field.isAnswerValid([])).toBe(false);
    expect(field.isAnswerValid(characters)).toBe(true);
    // They can pick mains even if we don't care.
    expect(
      field.isAnswerValid([characters[0], { ...characters[1], main: true }]),
    ).toBe(true);
    // We don't want affirmations in the negative.
    expect(
      field.isAnswerValid([characters[0], { ...characters[1], main: false }]),
    ).toBe(false);

    (field.options as CreateCharacterFieldOptionsDTO).requireMain = true;

    expect(field.isAnswerValid(characters)).toBe(false);

    // Cannot pick multiple mains.
    expect(
      field.isAnswerValid([
        { ...characters[0], main: true },
        { ...characters[1], main: true },
        characters[2],
      ]),
    ).toBe(false);
  });
});
