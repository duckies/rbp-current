import type { Enum, LinkedResource, Realm, Resource } from '../../interfaces'
import type { Character } from './character.interface'

export interface Guild {
  name: string
  id: number
  realm: Realm
  faction: Enum<'Alliance' | 'Horde'>
}

export interface GuildCharacter extends Character {
  playable_class: Resource
  playable_race: Resource
}

export interface GuildMember {
  character: GuildCharacter
  rank: number
}

export interface GuildRoster extends LinkedResource {
  guild: Guild
  members: GuildMember[]
}
