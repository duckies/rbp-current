import { BadRequestException, GoneException, Injectable } from '@nestjs/common';
import { FieldType } from '@prisma/client';
import { isArray, isBoolean, isString } from '@rbp/shared';
import { PrismaService } from '../common/database/prisma.service';
import { FormFieldEntityDTO } from '../form-field/interfaces/form-field-entity.dto';
import { CreateFormSubmissionDTO } from './dto/create-form-submission.dto';

@Injectable()
export class FormSubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  private validateFieldResponse(field: FormFieldEntityDTO, response: unknown) {
    switch (field.type) {
      case FieldType.Text:
        if (!isString(response)) {
          throw new BadRequestException(`Field "${field.id}" must be a string`);
        }
        break;
      case FieldType.Select: {
        const possibleValues = field.options.items.map(o => o.value);

        if (isArray(response)) {
          if (!field.options.multiple) {
            throw new BadRequestException(
              `Field "${field.id}" only accepts one response`,
            );
          }
          else if (!response.every(r => possibleValues.includes(r))) {
            throw new BadRequestException(
              `Field "${field.id}" has an invalid response`,
            );
          }
        }
        else if (!isString(response) || !possibleValues.includes(response)) {
          throw new BadRequestException(
            `Field "${field.id}" has an invalid response`,
          );
        }
        break;
      }
      case FieldType.Combobox:
        if (isArray(response) && !field.options.multiple) {
          throw new BadRequestException(
            `Field "${field.id}" only accepts one response`,
          );
        }
        else if (!isString(response)) {
          throw new BadRequestException(`Field "${field.id}" must be a string`);
        }
        break;
      case FieldType.Checkbox:
        if (!isBoolean(response)) {
          throw new BadRequestException(`Field "${field.id}" must be a boolean`);
        }
        break;
    }
  }

  async create(
    formId: number,
    createFormSubmissionDTO: CreateFormSubmissionDTO,
  ) {
    const form = await this.prisma.form.findFirstOrThrow({
      where: { id: formId },
      include: { fields: true },
    });

    if (form.closed) {
      throw new GoneException();
    }

    for (const field of form.fields) {
      const response = createFormSubmissionDTO.responses[field.id];

      if (field.required && !response) {
        throw new BadRequestException(`Field "${field.id}" is required`);
      }
      else if (response) {
        this.validateFieldResponse(field as FormFieldEntityDTO, response);
      }
    }

    return this.prisma.formSubmission.create({
      data: {
        formId,
        ...createFormSubmissionDTO,
      },
    });
  }
}
