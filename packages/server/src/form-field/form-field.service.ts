import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { CreateFormFieldDTO } from './dto/create-form-field.dto'
import { UpdateFormFieldDTO } from './dto/update-form-field.dto'

@Injectable()
export class FormFieldService {
  constructor(private readonly prisma: PrismaClient) {}

  create(formId: number, createFormFieldDTO: CreateFormFieldDTO) {
    return this.prisma.formField.create({
      data: { ...createFormFieldDTO, formId },
    })
  }

  findOne(id: number) {
    return this.prisma.formField.findUniqueOrThrow({ where: { id } })
  }

  findAll(take?: number, skip?: number) {
    return this.prisma.formField.findMany({ take, skip })
  }

  update(id: number, updateFormFieldDTO: UpdateFormFieldDTO) {
    return this.prisma.formField.update({
      where: { id },
      data: updateFormFieldDTO,
    })
  }

  delete(id: number) {
    return this.prisma.formField.delete({ where: { id } })
  }
}
