import type { Dictionary } from './types';

export function isNumber(value: unknown): value is number {
  return typeof value === 'number' && !isNaN(value);
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === 'boolean';
}

export function isArray(value: unknown): value is Array<any> {
  return Array.isArray(value);
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object' && value !== null;
}

/**
 * Non-exhaustive check if a value is a plain object.
 * This is good enough to filter non-object values in JSON.
 */
export function isPOJO(value: unknown): value is Dictionary {
  return isObject(value) && value?.constructor === Object;
}
