import { Type } from 'class-transformer'
import {
  IsDefined,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

export class DiscordConfig {
  @IsString()
  ID!: string

  @IsString()
  SECRET!: string

  @IsString()
  REDIRECT!: string

  @IsString()
  BOT_TOKEN!: string
}

export class BlizzardConfig {
  @IsString()
  ID!: string

  @IsString()
  SECRET!: string

  @IsString()
  REDIRECT!: string
}

export class EnvironmentVariables {
  @IsOptional()
  @IsEnum(Environment)
  NODE_ENV = Environment.Development

  @IsOptional()
  @IsNumber()
  PORT = 3000

  @IsString()
  JWT_SECRET!: string

  @IsDefined()
  @Type(() => DiscordConfig)
  @ValidateNested()
  DISCORD!: DiscordConfig

  @IsDefined()
  @Type(() => BlizzardConfig)
  @ValidateNested()
  BLIZZARD!: BlizzardConfig
}
