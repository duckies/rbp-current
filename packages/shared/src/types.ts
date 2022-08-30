export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value)
}

export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean'
}

export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value)
}
