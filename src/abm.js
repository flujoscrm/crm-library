import { getInitialValues } from './misc';
import { getData } from './auth';
import { getToday } from './date';

/**
 * Obtiene los campos activos de un formulario desde la base de datos
 * @param {*} props - Las props del flujo.
 * @param {*} form - El nombre del formulario a obtener.
 * @param {Array} extraColumns - Columnas extra a filtrar. [{nombreObjeto: 'NOMBRE', valor: 'VALOR'}]
 * @returns {Promise<Array>} - Una promesa que resuelve con la respuesta del ABM.
 */
export const getFormFields = async (props, form, extraColumns = []) => {
  const { registerUrl, token, tokenUrl } = getInitialValues(props);
  const payload = {
    nombreTabla: 'CONF_CAMPOS',
    columnas: [
      { nombreObjeto: 'FORMULARIO', valor: form },
      { nombreObjeto: 'ACTIVO', valor: 'S' },
      ...extraColumns,
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
