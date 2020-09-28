import toNumber from './';

test('should format currency string to number', () => {
  expect(toNumber('R$ 100.000,00')).toBe(100000);
});
