/**
 * @constant {string[]} WEEKDAYS - Los nombres de los días de la semana.
 */
export const WEEKDAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

/**
 * @constant {string[]} MONTHS - Los nombres de los meses.
 */
export const MONTHS = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

/**
 * Obtiene la fecha actual en formato ISO 8601
 * @returns {string} - La fecha actual en formato ISO 8601.
 */
export const getToday = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00+00:00`;
};

/**
 * Obtiene la fecha actual en formato ISO 8601 con la hora actual region Py.
 * @param {*} addDayValue - Valor a sumar a la fecha actual.
 * @returns  {string} - La fecha actual en formato ISO 8601.
 */
export const getNow = addDayValue => {
  const now = new Date();
  now.setHours(now.getHours() - 4);

  now.setDate(now.getDate() + addDayValue);

  const year = now.getUTCFullYear();
  const month = String(now.getUTCMonth() + 1).padStart(2, '0');
  const day = String(now.getUTCDate()).padStart(2, '0');
  const hours = String(now.getUTCHours()).padStart(2, '0');
  const minutes = String(now.getUTCMinutes()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

/**
 * Obtiene el día de la semana, el mes y el año de una fecha dada en formato "dd/mm/yyyy".
 * @param {string} dateString - La fecha en formato "dd/mm/yyyy".
 * @returns {Object} Un objeto con el día de la semana, el mes y el año.
 * @property {string} dayOfWeek - El día de la semana.
 * @property {string} month - El nombre del mes.
 * @property {number} year - El año.
 * @throws {Error} Si el formato de la fecha es incorrecto.
 */
export const getDayOfWeekMonthYear = dateString => {
  const [day, month, year] = dateString.split('/').map(Number);

  const date = new Date(year, month - 1, day);

  if (isNaN(date.getTime())) {
    throw new Error('Fecha inválida.');
  }

  const dayOfWeek = WEEKDAYS[date.getDay()];
  const monthName = MONTHS[month - 1];

  return {
    dayOfWeek,
    year,
    month: monthName,
  };
};
