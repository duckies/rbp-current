import { IsNumber, IsString } from 'class-validator'

export class TokenDTO {
  @IsString()
  access_token!: string

  @IsNumber()
  expires_at!: number

  @IsString()
  refresh_token!: string
}
