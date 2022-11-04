import { SqlEntityManager } from '@mikro-orm/mysql';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  public readonly repository;

  constructor(private readonly em: SqlEntityManager) {
    this.repository = em.getRepository(User);
  }

  public async getPermissions(id: number) {
    const user = await this.repository.findOneOrFail(id, {
      populate: ['roles.permissions'],
    });

    return user.roles.getItems().flatMap(role => role.permissions.getItems());
  }
}
