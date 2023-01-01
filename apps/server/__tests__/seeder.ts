import { EntityManager } from '@mikro-orm/core'
import { Seeder } from '@mikro-orm/seeder'
import { Form } from '../src/form/form.entity'

export class TestingSeeder extends Seeder {
  async run(em: EntityManager) {
    em.create(Form, {
      title: 'Raider Application',
      closed: false,
      fields: [
        {
          label: 'Characters',
          type: 'character',
          required: true,
          order: 1,
          options: { multiple: true, requireMain: true },
        },
        { label: 'What is your main specialization?', type: 'text', required: true, order: 2 },
        {
          label: 'Are you willing to play an offspec or alt?',
          type: 'text',
          required: true,
          order: 3,
          options: { multiline: true },
        },
        {
          label: 'Link any relevant WarcraftLogs profiles:',
          type: 'text',
          required: true,
          order: 4,
          options: { multiline: true },
        },
        {
          label: 'Why are you leaving your current guild?',
          type: 'text',
          required: true,
          order: 5,
          options: { multiline: true },
        },
        {
          label: 'What is your raiding experience?',
          type: 'text',
          required: true,
          order: 6,
          options: { multiline: true },
        },
        {
          label: 'What are your raiding goals?',
          type: 'text',
          required: true,
          order: 7,
          options: { multiline: true },
        },
        {
          label: 'What made you apply to Really Bad Players?',
          type: 'text',
          required: true,
          order: 8,
          options: { multiline: true },
        },
        {
          label: "Any other information you'd like to share? Tell us about yourself.",
          type: 'text',
          required: true,
          order: 9,
          options: { multiline: true },
        },
      ],
    })
  }
}
