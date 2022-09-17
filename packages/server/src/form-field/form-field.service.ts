import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '../common/database/prisma.service'
import { CreateFormFieldBaseDTO } from './dto/create-form-field.dto'
import { UpdateFormFieldDTO } from './dto/update-form-field.dto'

@Injectable()
export class FormFieldService {
  constructor(private readonly prisma: PrismaService) {}

  create(formId: number, createFormFieldDTO: CreateFormFieldBaseDTO) {
    const { description, label, type, required, order, ...options } =
      createFormFieldDTO

    return this.prisma.formField.create({
      data: { description, label, type, required, order, formId, options },
    })
  }

  findOne(id: number) {
    return this.prisma.formField.findUniqueOrThrow({ where: { id } })
  }

  findAll(take?: number, skip?: number) {
    return this.prisma.formField.findMany({ take, skip })
  }

  async update(id: number, updateFormFieldDTO: UpdateFormFieldDTO) {
    const { type, label, description, required, order, ...options } =
      updateFormFieldDTO

    const field = await this.prisma.formField.findUniqueOrThrow({
      where: { id },
    })

    if (field.type !== type) {
      throw new BadRequestException('Field types cannot be changed')
    }

    return this.prisma.formField.update({
      where: { id },
      data: { label, description, required, order, options },
    })
  }

  delete(id: number) {
    return this.prisma.formField.delete({ where: { id } })
  }
}
