import { BadRequestException, Injectable } from '@nestjs/common'
import { FieldType, FormField } from '@prisma/client'
import { isString } from '@rbp/shared'
import { PrismaService } from '../common/database/prisma.service'
import { CreateFormSubmissionDTO } from './dto/create-form-submission.dto'

@Injectable()
export class FormSubmissionService {
  constructor(private readonly prisma: PrismaService) {}

  private validateFieldResponse(field: FormField, response: unknown) {
    switch (field.type) {
      case FieldType.Text:
        if (!isString(response)) {
          throw new BadRequestException(`Field "${field.id}" must be a string`)
        }
        break
      case FieldType.Select:
    }
  }

  create(formId: number, createFormSubmissionDTO: CreateFormSubmissionDTO) {
    return this.prisma.formSubmission.create({
      data: {
        formId,
        ...createFormSubmissionDTO,
      },
    })
  }
}
