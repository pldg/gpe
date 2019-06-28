const {
  isNonEmptyString,
} = require('./utils');

function parseAlt(alt) {
  if (!alt) {
    alt = '';
  } else if (alt && !isNonEmptyString(alt)) {
    throw new Error('`alt` must be a non-empty string');
  }

  return alt;
}

module.exports = parseAlt;