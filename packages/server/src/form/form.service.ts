import { Injectable } from '@nestjs/common'
import type { Prisma } from '@prisma/client'
import { PrismaClient } from '@prisma/client'
import { CreateFormDTO } from './dto/create-form.dto'
import { UpdateFormDTO } from './dto/update-form.dto'

@Injectable()
export class FormService {
  constructor(private readonly prisma: PrismaClient) {}

  create(createFormDTO: CreateFormDTO) {
    return this.prisma.form.create({ data: createFormDTO })
  }

  findOne(id: number) {
    return this.prisma.form.findUniqueOrThrow({
      where: { id },
      select: { fields: true },
    })
  }

  findAll(data: Prisma.FormFindManyArgs = {}) {
    return this.prisma.form.findMany(data)
  }

  update(id: number, updateFormDTO: UpdateFormDTO) {
    return this.prisma.form.update({ where: { id }, data: updateFormDTO })
  }

  delete(id: number) {
    return this.prisma.form.delete({ where: { id } })
  }
}
