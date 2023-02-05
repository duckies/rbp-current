export interface ZonesResponse {
  data: {
    worldData: {
      expansions: Expansion[]
    }
  }
}

export interface Expansion {
  id: number
  name: string
  zones: Zone[]
}

export interface Zone {
  id: number
  name: string
  encounters: Encounter[]
  difficulties: Difficulty[]
}

export interface Encounter {
  id: number
  name: string
}

export interface Difficulty {
  id: number
  name: string
}
