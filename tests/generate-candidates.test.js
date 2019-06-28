const candidates = require('./candidates');
const {
  isObjectLiteral,
  isNonEmptyString
} = require('../lib/utils');

test('Is array', () => expect(Array.isArray(candidates)).toBeTruthy());

test('Contains only objects', () => {
  const hasOnlyObjects = candidates.every(c => isObjectLiteral(c));

  expect(hasOnlyObjects).toBeTruthy();
});

test('Have correct properties', () => {
  candidates.forEach(c => {
    expect(Object.keys(c).length).toBe(4);
    expect(c).toHaveProperty('filename');
    expect(c).toHaveProperty('ext');
    expect(c).toHaveProperty('width');
    expect(c).toHaveProperty('art');
  });
});

test('Have correct types', () => {
  candidates.forEach(c => {
    expect(isNonEmptyString(c.filename)).toBeTruthy();
    expect(isNonEmptyString(c.ext)).toBeTruthy();
    expect(Number.isInteger(c.width)).toBeTruthy();
  });

  expect(candidates[0].art).toBeUndefined();
  expect(isNonEmptyString(candidates[4].art)).toBeTruthy();
});