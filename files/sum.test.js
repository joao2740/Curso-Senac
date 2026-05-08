const sum = require('./sum');

test('deve somar 1 + 2 e retornar 3', () => {
  expect(sum(1, 2)).toBe(3);
});
