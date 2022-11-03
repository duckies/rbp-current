import { SqlEntityManager } from '@mikro-orm/knex';
import { Injectable } from '@nestjs/common';
import { Permission, Role } from '../entities';
import { CreatePermissionDTO } from './dto/create-permission.dto';
import { UpdatePermissionDTO } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  public readonly repository;

  constructor(private readonly em: SqlEntityManager) {
    this.repository = em.getRepository(Permission);
  }

  public async create({ role, ...data }: CreatePermissionDTO) {
    const permission = this.repository.create({
      ...data,
      role: this.em.getReference(Role, role),
    });

    await this.em.persist(permission).flush();

    return permission;
  }

  public async update(id: number, { role, ...data }: UpdatePermissionDTO) {
    const permission = await this.repository.findOneOrFail(id);

    this.repository.assign(permission, data);

    if (role) {
      permission.role = this.em.getReference(Role, role);
    }

    await this.repository.flush();

    return permission;
  }

  public async delete(id: number) {
    const permission = await this.repository.findOneOrFail(id);

    return this.repository.remove(permission).flush();
  }
}
