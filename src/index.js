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

const crmLibrary = {
  WEEKDAYS,
  MONTHS,
  getToday,
  getNow,
  getDayOfWeekMonthYear,
  getAtlasToken,
  getData,
  getPropsInfo,
  getCurrentStep,
  getCorrelationId,
  buildUrls,
  getInitialValues,
  getGlobalVariables,
  convertToBase64,
  downloadPdf,
};

if (typeof window !== 'undefined') {
  window.crmLibrary = crmLibrary;
}

export default crmLibrary;
