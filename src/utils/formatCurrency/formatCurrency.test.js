import formatCurrency from './';

test('should return empty string when user input an invalid value', () => {
  expect(formatCurrency('number')).toBe('');
  expect(formatCurrency(undefined)).toBe('');
});

test('show currency format when received a number', () => {
  expect(formatCurrency(1000)).toBe('R$1,000.00');
});
