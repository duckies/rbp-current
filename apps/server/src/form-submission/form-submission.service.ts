import { SqlEntityManager } from '@mikro-orm/knex';
import { BadRequestException, GoneException, Injectable } from '@nestjs/common';
import { Form } from '../entities';
import { FormSubmission } from '../entities/form-submission.entity';
import { CreateFormSubmissionDTO } from './dto/create-form-submission.dto';

@Injectable()
export class FormSubmissionService {
  public readonly repository;

  constructor(private readonly em: SqlEntityManager) {
    this.repository = em.getRepository(FormSubmission);
  }

  async create(
    formId: number,
    { responses }: CreateFormSubmissionDTO,
  ) {
    const form = await this.em.findOneOrFail(Form, formId);

    if (form.closed) {
      throw new GoneException();
    }

    for (const field of form.fields) {
      const answer = responses[field.id];

      if (field.required && answer === undefined) {
        throw new BadRequestException(`Field "${field.id}" is required`);
      }

      if (!field.isAnswerValid(answer)) {
        throw new BadRequestException(`Field "${field.id}" is invalid`);
      }
    }

    const fieldIds = form.fields.getIdentifiers();
    const invalidFields = Object.keys(responses).filter(key => !fieldIds.includes(key));

    if (invalidFields.length > 0) {
      throw new BadRequestException(`Unknown fields: ${invalidFields.join(', ')}`);
    }

    const submission = this.em.create(FormSubmission, { responses, form });

    await this.em.persist(submission).flush();

    return submission;
  }
}
