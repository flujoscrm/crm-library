/**
 * Obtiene el token para hacer requests a la API de Atlas.
 *
 * @async
 * @function getAtlasToken
 * @param {string} token - Token que se obtiene de las props.
 * @param {string} today - Fecha actual en formato ISO 8601.
 * @param {string} tokenUrl - URL para obtener el token de Atlas que se obtiene de la función getInitialValues.
 * @param {Object} [payload={}] - Datos a enviar en el cuerpo de la solicitud. Por defecto, un objeto vacío.
 * @param {string} payload.nombreTabla - Nombre de la tabla a la que se hace referencia.
 * @param {Array} payload.columnas - Lista de columnas con sus respectivos valores.
 * @param {string} payload.columnas[].nombreObjeto - Nombre del objeto de la columna.
 * @param {string} payload.columnas[].valor - Valor asociado al objeto de la columna.
 * @returns {Promise<string|null>} - Una promesa que resuelve con el token para hacer requests a la API de Atlas o `null` en caso de error.
 * @example
 * //Ejemplo de uso de getAtlasToken
 * const {token, tokenUrl} = getInitialValues(props);
 * const today = getToday();
 * const payload = {nombreTabla: 'VISTA', columnas: [{nombreObjeto: '', valor: ''}]};
 * const atlasToken = await getAtlasToken(token, today, tokenUrl, payload);
 */
export const getAtlasToken = async (token, today, tokenUrl, payload = {}) => {
  const header = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };

  const body = {
    user: 'admin',
    date: today,
    url: '/clientes/obtener-registros',
    requestBody: JSON.stringify(payload),
    method: 'POST',
  };

  const options = {
    method: 'POST',
    headers: header,
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(tokenUrl, options);
    return await response.text();
  } catch (error) {
    console.error('Error obteniendo el token de Atlas:', {
      message: error?.message,
      stack: error?.stack,
      tokenUrl,
      payload,
    });
    return '';
  }
};



/**
 * Obtiene datos de las API's
 * @param {*} url - URL de la API.
 * @param {*} payload - Datos a enviar en el cuerpo de la solicitud.
 * @param {*} token - Token que se obtiene de las props.
 * @param {*} tokenUrl - URL para obtener el token de Atlas que se obtiene de la función getInitialValues.
 * @param {*} type - Tipo de solicitud. Puede ser 'GET' o 'POST'.
 * @param {*} today - Fecha actual en formato ISO 8601.
 * @param {*} forAtlas - Indica si la solicitud es para Atlas. Por defecto, `false`.
 * @returns {Promise<Object>} - Una promesa que resuelve con los datos de la API.
 */
export const getData = async (
  url,
  payload,
  token,
  tokenUrl,
  type,
  today,
  forAtlas = false
) => {
  const atlasToken = await getAtlasToken(token, today, tokenUrl, payload);
  if (!atlasToken) return null;
  let header = {
    'Content-Type': 'application/json',
  };

  if (token) {
    header = {
      ...header,
      Authorization: `Bearer ${token}`,
    };
  }

  let body = {
    data: JSON.stringify(payload),
  };

  if (!forAtlas) {
    body = payload;
  }

  if (forAtlas) {
    body.token = atlasToken;
    body.date = today;
  }

  const options = {
    method: type,
    headers: header,
    body: JSON.stringify(body),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    console.error('Error en la solicitud:', {
      status: response?.status,
      statusText: response?.statusText,
      url,
      payload,
      type,
      today,
      forAtlas,
    });
    return { ...response, ok: false};
  }
  return response.json();
};
