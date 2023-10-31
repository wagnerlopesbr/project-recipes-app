import { passwordRegex } from '../Helpers/helpers';

describe('Testanto o helpers', () => {
  test('Testa se a função funciona correta', () => {
    expect(passwordRegex(2).test('23323')).toBe(false);
    expect(passwordRegex(2).test('AA')).toBe(false);
    expect(passwordRegex(8).test('Aa@11233213')).toBe(true);
  });
});
