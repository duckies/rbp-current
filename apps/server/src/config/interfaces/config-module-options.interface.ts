import { Constructor } from '../../common/interfaces'

export interface ConfigModuleOptions {
  /**
   * The root application configuration class.
   */
  schema: Constructor<any>

  /**
   * If "true", registers `ConfigModule` as a global module.
   * Defaults to "true".
   */
  isGlobal?: boolean

  /**
   * If "true", environment files (`.env`) will be ignored.
   */
  ignoreEnvFile?: boolean

  /**
   * If "true", predefined environment variables will not be validated.
   */
  ignoreEnvVars?: boolean

  /**
   * The name of the environment file to load.
   * Defaults to `.env`.
   */
  envFileName?: string

  /**
   * The character(s) to use to separate out nested schemas.
   */
  envSeparator?: string
}
