import type { Entries } from 'type-fest'

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export function entries<T extends Record<string, unknown>>(
  value: T,
): Entries<T> {
  return Object.entries(value) as any
}
