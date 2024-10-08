import { getInitialValues } from './misc.js';
import { getData, getAtlasToken } from './auth.js';
import { getToday } from './date.js';

/**
 * Obtiene los campos activos de un formulario desde la base de datos
 * @param {*} props - Las props del flujo.
 * @param {string} form - El nombre del formulario a obtener.
 * @param {string} configType - Tipo de campo a ser recuperado.
 * @returns {Promise<Array>} - Una promesa que resuelve con la respuesta del ABM.
 */
export const getFormFields = async (props, form, configType) => {
  const { registerUrl, token, tokenUrl } = getInitialValues(props);
  const payload = {
    nombreTabla: 'CONF_CAMPOS',
    columnas: [
      { nombreObjeto: 'FORMULARIO', valor: form },
      { nombreObjeto: 'ACTIVO', valor: 'S' },
      { nombreObjeto: 'TIPO_CONF', valor: configType },
    ],
  };

  return getData(
    registerUrl,
    payload,
    token,
    tokenUrl,
    'POST',
    getToday(),
    true
  );
};

/**
 * Funcion para obtener registros del ABM.
 * @param {Object} props - Las props del flujo.
 * @param {Object} payload - Datos a enviar en el cuerpo de la solicitud.
 * @returns {Promise<Object>} - Una promesa que resuelve con los registros del ABM.
 * @example
 * // Ejemplo de uso de obtainRegisters
 * const payload = {
 * nombreTabla: 'PAISES',
 * columnas: [{nombreObjeto: 'COD_PAIS', valor: '1'}]
 * };
 * const res = await obtainRegisters(flowProps, payload);
 * const paises =res?.respuesta?.[0] || [];
 */
export const obtainRegisters = async (props, payload) => {
  const { registerUrl, token, tokenUrl } = getInitialValues(props);
  return getData(
    registerUrl,
    payload,
    token,
    tokenUrl,
    'POST',
    getToday(),
    true
  );
};

export const dynamicExecute = async (props, payload, apiKey) => {
  const { token, tokenUrl, executeUrl } = getInitialValues(props);
  const today = getToday();
  const url = '/clientes/execute-dinamico';
  const atlasToken = await getAtlasToken(token, today, tokenUrl, url, payload);

  const headers = {
    'Content-Type': 'application/json',
    'X-RshkMichi-ApiKey': apiKey,
    'X-Atl-Timestamp': today,
    'X-Atl-Auth': atlasToken,
  };

  const options = {
    headers,
    body: JSON.stringify(payload),
    method: 'POST',
  };

  try {
    const response = await fetch(executeUrl, options);
    if (!response.ok) {
      console.error('Error en la solicitud:', {
        status: response?.status,
        statusText: response?.statusText,
        payload,
      });
      return { ...response, ok: false };
    }
    return response.json();
  } catch (error) {
    console.error('Error realizando el execute dinamico:', error);
    return {};
  }
};

export const fetchAtlas = async (props, options) => {
  const { fetchUrl } = getInitialValues(props);
  const { data, requesturi, urlversionuri, baseuri, method, user } = options;

  const body = {
    data,
    requesturi,
    urlversionuri,
    baseuri,
    typemethod: {
      method,
    },
    user,
  };

  try {
    const response = await fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      console.error('Error en la solicitud:', {
        status: response?.status,
        statusText: response?.statusText,
        body,
      });
      return { ...response, ok: false };
    }

    return response.json();
  } catch (error) {
    console.error('Error realizando la solicitud:', error);
    return {};
  }
};

export const buildAbmAccionarBody = (action, table, columns) => {
  return {
    accion: action,
    tabla: table,
    columnas: columns,
  };
};
