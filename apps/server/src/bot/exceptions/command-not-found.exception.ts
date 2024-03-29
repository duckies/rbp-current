import { NotFoundException } from '@nestjs/common'

export class CommandNotFoundException extends NotFoundException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description)
  }
}
