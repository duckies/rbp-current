import { SqlEntityManager } from '@mikro-orm/knex'
import { Injectable } from '@nestjs/common'
import { Config } from './config.entity'

export interface ConfigSchema {
  [key: string]: any
}

// , K extends Extract<keyof S, string>

@Injectable()
export class ConfigService<S extends ConfigSchema> {
  private readonly em: SqlEntityManager

  constructor(em: SqlEntityManager) {
    this.em = em.fork()
  }

  public async get<K extends Extract<keyof S, string>>(key: K): Promise<S[K] | null> {
    return (await this.em.findOne(Config, key))?.value || null
  }

  public async set<K extends Extract<keyof S, string>>(key: K, value: S[K]): Promise<S[K] | null> {
    let config = await this.em.findOne(Config, key)

    if (!config) {
      config = new Config(key, value)
      this.em.persist(config)
    } else {
      config.value = value
    }

    await this.em.flush()

    return config?.value
  }
}
