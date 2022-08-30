import { plainToInstance } from 'class-transformer'
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
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

  @IsString()
  DISCORD_ID!: string

  @IsString()
  DISCORD_SECRET!: string

  @IsString()
  DISCORD_REDIRECT!: string

  @IsString()
  BLIZZARD_ID!: string

  @IsString()
  BLIZZARD_SECRET!: string

  @IsString()
  BLIZZARD_REDIRECT!: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  })
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
    whitelist: true,
  })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }

  return validatedConfig
}
