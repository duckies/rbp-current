import { HttpException } from '@nestjs/common';

/**
 * Thrown when the character ID returned from the Battle.net API does not
 * match the character ID in the database.
 */
export class CharacterIdMismatchError extends HttpException {
  constructor() {
    super('Character ID mismatch', 410);
  }
}
