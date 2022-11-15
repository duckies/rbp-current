import type { RealmName, RealmSlug } from '../../../core/realms';

export interface Href {
  href: string
}

export interface Link {
  self: Href
}

export interface Resource {
  key: Href
  id: number
}

export interface LinkedResource {
  _links: Link
}

export interface Enum<T = string> {
  type: string
  name: T
}

export interface KeyId {
  key: Href
  id: number
}

export interface NameId {
  name: string
  id: number
}

export interface KeyNameId extends NameId {
  key: Href
}

export interface DisplayKeyNameId extends NameId {
  display_string: string
}

export interface Realm {
  id: number
  name: RealmName
  slug: RealmSlug
}

export interface Color {
  r: number
  g: number
  b: number
  a: number
}
