import {
  getToday,
  getNow,
  getDayOfWeekMonthYear,
} from '../src/index';
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

describe('getNow', () => {
  it('Debe retornar la fecha y hora actual en formato AAAA-MM-DDTHH:MM', () => {
    const now = new Date();
    now.setHours(now.getHours() - 4);
    const year = now.getUTCFullYear();
    const month = String(now.getUTCMonth() + 1).padStart(2, '0');
    const day = String(now.getUTCDate()).padStart(2, '0');
    const hours = String(now.getUTCHours()).padStart(2, '0');
    const minutes = String(now.getUTCMinutes()).padStart(2, '0');
    const expected = `${year}-${month}-${day}T${hours}:${minutes}`;
    const result = getNow(0);
    expect(result).toBe(expected);
  });
});

describe('getDayOfWeekMonthYear', () => {
  it('Debe retornar objeto con dia de la semana, año, y mes', () => {
    const dayOfWeek = 'Martes';
    const month = 'Julio';
    const year = 2024;
    const dateString = '23/07/2024';
    const expected = { dayOfWeek, month, year };
    const result = getDayOfWeekMonthYear(dateString);
    expect(result).toEqual(expected);
  });
});
