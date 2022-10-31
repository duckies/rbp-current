import { Injectable } from '@nestjs/common';
import type { Prisma } from '@prisma/client';
import { PrismaService } from '../common/database/prisma.service';
import { CreateFormDTO, UpdateFormDTO } from './dto';

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaService) {}

  create(createFormDTO: CreateFormDTO) {
    return this.prisma.form.create({ data: createFormDTO });
  }

  findOne(id: number) {
    return this.prisma.form.findUniqueOrThrow({
      where: { id },
      include: { fields: true },
    });
  }

  findAll(data: Prisma.FormFindManyArgs = {}) {
    return this.prisma.form.findMany(data);
  }

  update(id: number, updateFormDTO: UpdateFormDTO) {
    return this.prisma.form.update({ where: { id }, data: updateFormDTO });
  }

  delete(id: number) {
    return this.prisma.form.delete({ where: { id } });
  }
}
