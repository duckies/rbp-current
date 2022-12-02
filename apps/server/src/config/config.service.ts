import { SqlEntityManager } from '@mikro-orm/knex'
import { Injectable } from '@nestjs/common'
import { Config } from './config.entity'

export interface ConfigSchema {
  [key: string]: any
}

@Injectable()
export class ConfigService<S extends ConfigSchema, K extends Extract<keyof S, string>> {
  constructor(private readonly em: SqlEntityManager) {}

  public get(key: K): Promise<Config<K, S[K]> | null> {
    return this.em.findOne(Config, key)
  }

  public async set(key: K, value: S[K]): Promise<Config<K, S[K]>> {
    let config = await this.em.findOne(Config, key)

    if (!config) {
      config = new Config(key, value)
      this.em.persist(config)
    }

    await this.em.flush()

    return config
  }
}
