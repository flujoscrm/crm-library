import {
  WEEKDAYS,
  MONTHS,
  getToday,
  getNow,
  getDayOfWeekMonthYear,
} from './date';

import { getAtlasToken, getData } from './auth';

import {
  getPropsInfo,
  getCurrentStep,
  getCorrelationId,
  buildUrls,
  getInitialValues,
  getGlobalVariables,
} from './misc';

import { convertToBase64, downloadPdf } from './file';


export const helloWorld = () => {
  console.log('FUNCIONA :D');
};
