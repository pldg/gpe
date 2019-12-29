/**
 * Filter consecutive objects that have equal *key:value*, stop after the first
 * series of matches.
 *
 * @param {Object[]} arr
 * @param {String} key Object key.
 * @param {String} value Value of object key.
 * @param {String} [i] Index to start search.
 * @returns {Object[]}
 * @see Example {@link https://jsfiddle.net/pkLchtba/}
 */
function consecutiveValues(arr, key, value, i = 0) {
  const newArr = [];

  for (i; i < arr.length; i++) {
    if (arr[i][key] === value) newArr.push(arr[i]);
    else break;
  }

  return newArr;
}

function arraysContainSameElements(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  arr1.sort();
  arr2.sort();

  for (let i = 0; i < arr1.length - 1; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

function isObjectLiteral(val) {
  return val === Object(val) &&
    Object.prototype.toString.call(val) === '[object Object]';
}

function isNonEmptyString(val) {
  return typeof val === 'string' && val.length > 0;
}

function isNumericString(val) {
  return isNonEmptyString(val) && !isNaN(val);
}

function isBool(val) {
  return typeof val === 'boolean';
}

module.exports = {
  consecutiveValues,
  arraysContainSameElements,
  isObjectLiteral,
  isNonEmptyString,
  isNumericString,
  isBool
};