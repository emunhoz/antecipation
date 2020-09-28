import kebabCase from './';

test('should format string in kebab case', () => {
  expect(kebabCase('My long string example')).toBe("my-long-string-example");
});
