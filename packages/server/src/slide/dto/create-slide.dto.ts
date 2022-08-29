import { IsOptional, IsString } from 'class-validator'

export class CreateSlideDTO {
  @IsString()
  title!: string

  @IsOptional()
  @IsString()
  caption?: string
}
