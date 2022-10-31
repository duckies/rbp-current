import { describe, expect, it } from 'vitest';
import { isBoolean, isNumber, isString } from './types';

describe('Type Utils', () => {
  it('should find numbers', () => {
    expect(isNumber(2)).toBe(true);
    expect(isNumber('2')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(Symbol(2))).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(undefined)).toBe(false);
    expect(isNumber({})).toBe(false);
  });

  it('should find strings', () => {
    expect(isString(2)).toBe(false);
    expect(isString('2')).toBe(true);
    expect(isString(true)).toBe(false);
    expect(isString(Symbol(2))).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    expect(isString({})).toBe(false);
  });

  it('should find booleans', () => {
    expect(isBoolean(2)).toBe(false);
    expect(isBoolean('2')).toBe(false);
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(Symbol(2))).toBe(false);
    expect(isBoolean(null)).toBe(false);
    expect(isBoolean(undefined)).toBe(false);
    expect(isBoolean({})).toBe(false);
  });
});
