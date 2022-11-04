import { SqlEntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { CreateRoleDTO } from './dto/create-role.dto';
import { Role } from './role.entity';

@Injectable()
export class RoleService {
  public readonly repository;

  constructor(private readonly em: SqlEntityManager) {
    this.repository = em.getRepository(Role);
  }

  public async create(createRoleDTO: CreateRoleDTO) {
    const role = this.em.create(Role, createRoleDTO);

    await this.em.persist(role).flush();

    return role;
  }
}
