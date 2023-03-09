import { IsNumber, IsOptional } from 'class-validator'

export class PaginationDTO {
  @IsOptional()
  @IsNumber()
  limit?: number

  @IsOptional()
  @IsNumber()
  offset?: number
}
