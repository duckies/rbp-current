export interface Stores {
  wcl: {
    channel: string
    monitoring: Record<string, string>
  }
  welcomer: {
    channels: Record<string, string>
    ['last-message']: string
  }
}

export type StoreScopes = keyof Stores
export type StoreKeys<S extends StoreScopes> = keyof Stores[S]
