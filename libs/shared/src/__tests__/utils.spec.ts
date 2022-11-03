import { describe, expect, it } from 'vitest';
import { capitalize } from '../utils';

describe('Utils', () => {
  it('should capitalize strings', () => {
    const input = 'hello';
    expect(capitalize(input)).toBe('Hello');
  });

  it('should lowercase the rest of the string', () => {
    const input = 'HELLO';
    expect(capitalize(input)).toBe('Hello');
  });

  it('shouldn\'t touch diacritis', () => {
    const input = 'ḣéllö';
    expect(capitalize(input)).toBe('Ḣéllö');
  });
});
