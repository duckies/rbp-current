import { Prisma } from '@prisma/client'

export type Responses = Record<number, unknown> & Prisma.InputJsonObject

export class CreateFormSubmissionDTO {
  responses!: Responses
}
