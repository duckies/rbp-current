import { SqlEntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { CreateFormDTO, UpdateFormDTO } from './dto';
import { Form } from './form.entity';

@Injectable()
export class FormService {
  public readonly repository;

  constructor(private readonly em: SqlEntityManager) {
    this.repository = em.getRepository(Form);
  }

  public async create(createFormDTO: CreateFormDTO) {
    const form = this.em.create(Form, createFormDTO);

    await this.em.persist(form).flush();

    return form;
  }

  public async update(id: number, updateFormDTO: UpdateFormDTO) {
    const form = await this.em.findOneOrFail(Form, id);

    this.em.assign(form, updateFormDTO);

    await this.em.persist(form).flush();

    return form;
  }

  public delete(id: number) {
    const form = this.em.findOneOrFail(Form, id, { populate: true });

    return this.em.removeAndFlush(form);
  }
}
