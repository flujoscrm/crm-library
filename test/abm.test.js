import * as abm from '../src/abm.js';
import props from './props.js';
import { describe, expect, it } from '@jest/globals';

describe('getFormFields', () => {
  it('Debe retornar los campos activos de un formulario', async () => {
    const form = 'FORMULARIO';
    const res = await abm.getFormFields(props, form);
    expect(res?.respuesta).toBeTruthy();
  });
});

describe('obtainRegisters', () => {
  it('Debe retornar los registros de un tabla', async () => {
    const payload = {
      nombreTabla: 'PAISES',
    };
    const res = await abm.obtainRegisters(props, payload);
    expect(res?.respuesta).toBeTruthy();
  });
});
