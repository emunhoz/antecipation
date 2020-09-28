import { maskCurrency, formatCurrency } from './';

test('should return empty string when user input an invalid value', () => {
  expect(maskCurrency('number')).toBe('');
  expect(maskCurrency(undefined)).toBe('');
});

test('show a masked value', () => {
  expect(maskCurrency(1000)).toBe('R$1,000.00');
});

test('should return zero value when user input is empty', () => {
  expect(formatCurrency('')).toBe("R$0.00");
});

test('show currency format when received a number', () => {
  expect(formatCurrency('1000')).toBe('R$10.00');
});
