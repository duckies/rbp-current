import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/database/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.RoleCreateInput) {
    return this.prisma.role.create({ data, include: { permissions: true } });
  }

  findOne(data: Prisma.RoleFindUniqueOrThrowArgs) {
    return this.prisma.role.findUniqueOrThrow(data);
  }

  findAll(where: Prisma.RoleWhereInput = {}, take?: number, skip?: number) {
    return this.prisma.role.findMany({
      where,
      take,
      skip,
      include: { permissions: true },
    });
  }
}
