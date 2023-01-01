import { SqlEntityManager } from '@mikro-orm/knex'
import { BadRequestException, GoneException, Injectable } from '@nestjs/common'
import { CharacterService } from '../character/character.service'
import { Form } from '../form/form.entity'
import {
  CreateFormSubmissionCharacterDTO,
  CreateFormSubmissionDTO,
} from './dto/create-form-submission.dto'
import { FormSubmission } from './form-submission.entity'

@Injectable()
export class FormSubmissionService {
  public readonly repository

  constructor(
    private readonly em: SqlEntityManager,
    private readonly characterService: CharacterService
  ) {
    this.repository = em.getRepository(FormSubmission)
  }

  async create(formId: number, { responses }: CreateFormSubmissionDTO) {
    const form = await this.em.findOneOrFail(Form, formId)

    if (form.closed) {
      throw new GoneException()
    }

    let characterDTOs: CreateFormSubmissionCharacterDTO[] = []

    for (const field of form.fields) {
      const answer = responses[field.id]

      if (answer === undefined) {
        if (field.required) {
          throw new BadRequestException(`Field "${field.id}" is required`)
        }
      } else if (!field.isAnswerValid(answer)) {
        throw new BadRequestException(`Field "${field.id}" is invalid`)
      } else if (field.type === 'character') {
        characterDTOs = answer as any
      }
    }

    const fieldIds = form.fields.getIdentifiers()
    const invalidFields = Object.keys(responses).filter((key) => !fieldIds.includes(key))

    if (invalidFields.length > 0) {
      throw new BadRequestException(`Unknown fields: ${invalidFields.join(', ')}`)
    }

    const characters = await Promise.all(
      characterDTOs.map(async ({ main, ...dto }) => {
        const character = await this.characterService.upsert(dto)

        return { character, main }
      })
    )

    const submission = this.em.create(FormSubmission, {
      responses,
      form,
      characters,
    })

    await this.em.persist(submission).flush()

    return submission
  }
}
