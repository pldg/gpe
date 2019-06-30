const {
  isNonEmptyString,
} = require('./utils');

function parsePlaceholder(placeholder) {
  if (placeholder && !isNonEmptyString(placeholder)) {
    throw new Error('`placeholder` must be a non-empty string');
  } else if (!placeholder) {
    placeholder = '';
  }

  return placeholder;
}

module.exports = parsePlaceholder;