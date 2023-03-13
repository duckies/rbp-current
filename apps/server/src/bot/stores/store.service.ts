import { EntityManager } from '@mikro-orm/core'
import { EntityRepository } from '@mikro-orm/knex'
import { Injectable } from '@nestjs/common'
import { StoreKeys, Stores, StoreScopes } from './interfaces/stores.interface'
import { Store } from './store.entity'

@Injectable()
export class StoreService {
  private readonly repository: EntityRepository<Store>

  constructor(private readonly em: EntityManager) {
    this.repository = this.em.fork().getRepository(Store)
  }

  public async get<S extends StoreScopes, K extends StoreKeys<S>>(
    scope: S,
    key: K
  ): Promise<Stores[S][K] | undefined>

  public async get<S extends StoreScopes, K extends StoreKeys<S>, D>(
    scope: S,
    key: K,
    defaultValue: D
  ): Promise<Stores[S][K] | D>

  public async get<S extends StoreScopes, K extends StoreKeys<S>, D>(
    scope: S,
    key: K,
    defaultValue?: D
  ) {
    const store = await this.repository.findOne(
      {
        scope,
        key,
      },
      { refresh: true }
    )

    return store ? store.value : typeof defaultValue !== 'undefined' ? defaultValue : undefined
  }

  public async set<S extends StoreScopes, K extends StoreKeys<S>, V extends Stores[S][K]>(
    scope: S,
    key: K,
    value: V
  ): Promise<V> {
    let store = await this.repository.findOne({ scope, key })

    if (!store) {
      store = this.repository.create({
        scope,
        key,
        value,
      })

      this.repository.persist(store)
    }

    await this.repository.flush()

    return store.value
  }
}
