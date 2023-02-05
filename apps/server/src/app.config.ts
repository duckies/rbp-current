import { Type } from 'class-transformer'
import { IsDefined, IsEnum, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator'
import { WarcraftLogsConfig } from './warcraft-logs/warcraft-logs.config'

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

  @IsString()
  GUILD_ID!: string
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
  @Type(() => Number)
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

  @IsDefined()
  @Type(() => WarcraftLogsConfig)
  @ValidateNested()
  WARCRAFT_LOGS!: WarcraftLogsConfig
}
