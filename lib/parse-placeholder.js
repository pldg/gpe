const {
  isNonEmptyString,
  isBool
} = require('./utils/utils');

function parsePlaceholder(placeholder) {
  if (placeholder) {
    if (!isNonEmptyString(placeholder) && !isBool(placeholder)) {
      throw new Error('`placeholder` must be a non-empty string or boolean');
    }
  } else {
    placeholder = '';
  }

  return placeholder;
}

module.exports = parsePlaceholder;