import { IsString } from 'class-validator'

export class FieldItemsDTO {
  @IsString()
  label!: string

  @IsString()
  value!: string
}
