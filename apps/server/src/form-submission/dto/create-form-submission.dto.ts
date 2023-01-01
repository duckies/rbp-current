import { IsBoolean, IsOptional } from 'class-validator'
import { FindCharacterDTO } from '../../character/dto/find-character.dto'
import { IsFormFieldArray } from '../validators/is-form-field-array.validator'

export class CreateFormSubmissionCharacterDTO extends FindCharacterDTO {
  @IsOptional()
  @IsBoolean()
  main?: boolean
}

export class CreateFormSubmissionDTO {
  @IsFormFieldArray({ message: 'Invalid response object' })
  responses!: Record<string, unknown>
}
