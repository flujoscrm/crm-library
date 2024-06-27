import { getInitialValues } from './misc';
import { getData } from './auth';
import { getToday } from './date';

const getFormFields = async (props, form) => {
  const { registerUrl, token, tokenUrl } = getInitialValues(props);
  const payload = {
    nombreObjeto: 'CONF_CAMPOS',
    columnas: [
      { nombreObjeto: 'FORMULARIO', valor: form },
      { nombreObjeto: 'ACTIVO', valor: 'S' },
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
