import { getToday } from './date.js';
import { getData } from './auth.js';

/**
 * Obtiene información relevante de las props.
 * @param {Object} props - Las props del flujo.
 * @returns {Object} - La información relevante de las props.
 */
export const getPropsInfo = props => {
  return {
    notification: props?.info?.notification || {},
    token: props?.token || '',
    config: props?.config || {},
  };
};

/**
 * Obtiene el paso actual del flujo.
 * @param {Object} notification - Objeto notificación.
 * @returns {number} - El paso actual del flujo.
 */
export const getCurrentStep = notification => notification?.currentStep || 0;

/**
 * Obtiene el id de correlación.
 * @param {Object} notification - Objeto notificación.
 * @param {number} currentStep - Paso actual del flujo.
 * @returns {string} - El id de correlación.
 */
export const getCorrelationId = (notification, currentStep) => {
  let correlationId = notification.correlationId;
  if (!correlationId) {
    correlationId = notification?.answers?.[currentStep]?.correlationId || '';
  }
  return correlationId;
};

/**
 * Construye urls necesarias para requests.
 * @param {Object} config - Configuración del flujo.
 * @returns {Object} - Las urls necesarias para requests.
 */
export const buildUrls = config => {
  const API_URL = config?.API_URL || '';
  const API_URL_FLOWS = config?.API_URL_FLOWS || '';

  return {
    tokenUrl: `${API_URL}/v1/integration/Imple/GetToken`,
    registerUrl: `${API_URL}/v1/integration/Imple/obtener-registros`,
    variablesUrl: `${API_URL_FLOWS}/api/v1/flows-engine/variables`,
    executeUrl: `'https://secure5.atlas.com.py:8080/clientes-atlas/v1.5.0/clientes/execute-dinamico';`
  };
};

/**
 * Obtiene los valores iniciales del formulario.
 * @param {Object} props - Las props del flujo.
 * @returns {Object} - Los valores iniciales del formulario.
 */
export const getInitialValues = props => {
  const { notification, token, config } = getPropsInfo(props);
  const currentStep = getCurrentStep(notification);
  const correlationId = getCorrelationId(notification, currentStep);
  const urls = buildUrls(config);

  return {
    notification,
    token,
    currentStep,
    correlationId,
    ...urls,
  };
};


/**
 * Obtiene las variables globales del flujo
 * @param {Array} variables - Lista de variables en string.
 * @param {string} correlationId - El id de correlación.
 * @param {string} token - El token de autenticación.
 * @param {string} variablesUrl - URL para obtener las variables globales.
 * @param {string} tokenUrl - URL para obtener el token de Atlas.
 * @param {string} today - Fecha actual en formato ISO 8601.
 * @returns {Promise<Object>} - Una promesa que resuelve con las variables globales del flujo.
 * @example
 * // Ejemplo de obtenecion de variables globales
 * const gVariables = await getGlobalVariables(variablesUrl, correlationId, token, ['variablesGlobales', 'codPersona'], tokenUrl, today);
 */
export const getGlobalVariables = async (
  variablesUrl,
  correlationId,
  token,
  variables,
  tokenUrl,
  today
) => {
  const url = variablesUrl;

  const payload = {
    correlationId,
    variableKeys: variables,
  };
  return getData(url, payload, token, tokenUrl, 'POST', today, false);
};

/**
 * Funcion para obtener variables del flujo
 * @param {Array} variables - Lista de variables en string.
 * @returns {Promise<Object>} - Una promesa que resuelve con las variables globales del flujo.
 */
export const getFlowVariables = async (props,variables) => {
  const { token, variablesUrl, tokenUrl, correlationId } = getInitialValues(props);
  const today = getToday();
  return getGlobalVariables(variablesUrl, correlationId, token, variables, tokenUrl, today);
};

export const stringToBoolean = string => string === 'S';
