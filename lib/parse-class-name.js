const {
  isNonEmptyString
} = require('./utils');

function parseClassName(className) {
  if (!className) {
    className = '';
  } else if (className && !isNonEmptyString(className)) {
    throw new Error('`className` must be a non-empty string');
  }

  return className;
}

module.exports = parseClassName;