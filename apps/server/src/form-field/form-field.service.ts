import { SqlEntityManager } from '@mikro-orm/knex';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Form } from '../form/form.entity';
import { CreateFormFieldDTO } from './dto/create-form-field.dto';
import { UpdateFormFieldDTO } from './dto/update-form-field.dto';
import { FormField } from './form-field.entity';

@Injectable()
export class FormFieldService {
  public readonly repository;

  constructor(private readonly em: SqlEntityManager) {
    this.repository = em.getRepository(FormField);
  }

  public async create(formId: number, createFormFieldDTO: CreateFormFieldDTO) {
    const form = await this.em.findOneOrFail(Form, formId);

    const field = this.repository.create({
      ...createFormFieldDTO,
      form,
    });

    await this.repository.persist(field).flush();

    return field;
  }

  public async update(id: string, { type, ...data }: UpdateFormFieldDTO) {
    const field = await this.repository.findOneOrFail(id);

    if (field.type !== type) {
      throw new BadRequestException('Field types cannot be changed');
    }

    this.repository.assign(field, data);

    await this.repository.flush();

    return field;
  }

  public async delete(id: string) {
    const field = await this.repository.findOneOrFail(id);

    return this.repository.remove(field).flush();
  }
}
