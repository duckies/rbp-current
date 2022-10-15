import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../common/database/prisma.service';

@Injectable()
export class UserService {
  public readonly repository;

  constructor(public prisma: PrismaService) {
    this.repository = prisma.user;
  }

  async create(data: Prisma.UserCreateArgs) {
    return this.prisma.user.create(data);
  }

  async findOne(data: Prisma.UserFindUniqueOrThrowArgs) {
    return this.prisma.user.findUniqueOrThrow({
      ...data,
      include: {
        identities: true,
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async findAll(data: Prisma.UserFindManyArgs = {}) {
    return this.prisma.user.findMany(data);
  }

  async getPermissions(id: number) {
    return this.prisma.permission.findMany({
      where: {
        role: {
          every: {
            user: {
              every: {
                id,
              },
            },
          },
        },
      },
      include: { role: true },
    });
  }
}
