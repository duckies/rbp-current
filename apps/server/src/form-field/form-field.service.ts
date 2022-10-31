import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../common/database/prisma.service';
import { CreateFormFieldDTO } from './dto/create-form-field.dto';
import { UpdateFormFieldDTO } from './dto/update-form-field.dto';

@Injectable()
export class FormFieldService {
  constructor(private readonly prisma: PrismaService) {}

  create(formId: number, createFormFieldDTO: CreateFormFieldDTO) {
    const { label, description, type, order } = createFormFieldDTO;
    const options = createFormFieldDTO.options as Prisma.InputJsonValue;

    return this.prisma.formField.create({
      data: { label, description, type, order, formId, options },
    });
  }

  findOne(id: number) {
    return this.prisma.formField.findUniqueOrThrow({ where: { id } });
  }

  findAll(take?: number, skip?: number) {
    return this.prisma.formField.findMany({ take, skip });
  }

  async update(id: number, updateFormFieldDTO: UpdateFormFieldDTO) {
    const { type, label, description, required, order, ...options }
      = updateFormFieldDTO;

    const field = await this.prisma.formField.findUniqueOrThrow({
      where: { id },
    });

    if (field.type !== type) {
      throw new BadRequestException('Field types cannot be changed');
    }

    return this.prisma.formField.update({
      where: { id },
      data: { label, description, required, order, options },
    });
  }

  delete(id: number) {
    return this.prisma.formField.delete({ where: { id } });
  }
}
