import { BadRequestException } from '@nestjs/common'

export class CommandMismatchException extends BadRequestException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description)
  }
}
