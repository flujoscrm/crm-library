import * as auth from '../src/auth.js';
import { getToday } from '../src';
import props from './props.js';

describe('getAtlasToken', () => {
  const { token, tokenUrl } = props;
  const today = getToday();
  const payload = {nombreTabla: 'PAISES'};

  it('Debe retornar el token para hacer consultas a la api de atlas', async () => {
    const atlasToken = await auth.getAtlasToken('', today, tokenUrl, payload);
    expect(atlasToken).toBeTruthy();
  });

  it('Debe retornar una cadena vacia en caso de error', () => {
    const atlasToken = auth.getAtlasToken(token, today, tokenUrl, payload);
    expect(atlasToken).resolves.toBe('');
  });
});

describe('getData', () => {
  const { url, token, tokenUrl } = props;
  const type = 'POST';
  const today = getToday();
  const payload = {nombreTabla: 'PAISES'};

  it('Debe retornar los datos de la API', async () => {
    const data = await auth.getData(url, payload, token, tokenUrl, type, today, true);
    expect(data).toBeTruthy();
  });

  it('Debe retornar un objeto de error con ok false', async () => {
    const data = await auth.getData('', payload, token, tokenUrl, type, today, true);
    const { ok } = data;
    expect(ok).toBe(false);
  });
});
