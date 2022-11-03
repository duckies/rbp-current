import type { Dictionary } from '@rbp/shared';
import { IsNotEmptyObject, IsObject } from 'class-validator';

export class CreateFormSubmissionDTO {
  @IsObject()
  @IsNotEmptyObject()
  responses!: Record<string, unknown>;
}
