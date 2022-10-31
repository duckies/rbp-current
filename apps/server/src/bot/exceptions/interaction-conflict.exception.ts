import { ConflictException } from '@nestjs/common'

export class InteractionConflictException extends ConflictException {
  constructor(objectOrError?: any, description?: string) {
    super(objectOrError, description)
  }
}
