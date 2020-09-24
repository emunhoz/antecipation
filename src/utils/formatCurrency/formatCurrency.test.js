import formatCurrency from './';

test('should return zero value when user input is empty', () => {
  expect(formatCurrency('')).toBe("R$0.00");
});

test('show currency format when received a number', () => {
  expect(formatCurrency('1000')).toBe('R$10.00');
});
