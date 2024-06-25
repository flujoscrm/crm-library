import { getToday } from '../src/index';
import { describe, expect, it } from '@jest/globals';

describe('getToday', () => {
  it('Debe retornar la fecha de hoy en formato AAAA-MM-DDT00:00:00+00:00', () => {
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const year = today.getUTCFullYear();
    const month = String(today.getUTCMonth() + 1).padStart(2, '0');
    const day = String(today.getUTCDate()).padStart(2, '0');
    const expected = `${year}-${month}-${day}T00:00:00+00:00`;
    const result = getToday();
    expect(result).toBe(expected);
  });
});
