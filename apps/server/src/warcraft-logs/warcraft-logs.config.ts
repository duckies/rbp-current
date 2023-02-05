import { IsString } from 'class-validator'

export class WarcraftLogsConfig {
  @IsString()
  ID!: string

  @IsString()
  SECRET!: string
}
