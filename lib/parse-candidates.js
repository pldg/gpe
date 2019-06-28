const {
  arraysContainSameElements,
  isObjectLiteral,
  isNonEmptyString
} = require('./utils');

function parseCandidates({
  candidates,
  extensions
}) {
  if (!Array.isArray(candidates)) {
    throw new Error('candidates: must be an array');
  }

  const validKeys = ['filename', 'ext', 'art', 'width'];

  const validCandidates = candidates.filter(c => {
    if (!isObjectLiteral(c)) {
      throw new Error('candidates: must contains only objects literal');
    }

    const keys = Object.keys(c);

    if (keys.length !== 4) {
      throw new Error('candidates: must have 4 properties');
    }

    if (!arraysContainSameElements(keys, validKeys)) {
      throw new Error('candidates: invalid properties');
    }

    keys.forEach(key => {
      const val = c[key];

      if (key === 'width' && !Number.isInteger(val)) {
        throw new Error('candidates: `width` must be a number');
      } else if (key === 'art' && !isNonEmptyString(val) && val !== undefined) {
        throw new Error('candidates: `art` must be non-empty string or undefined');
      } else if (key !== 'art' && key !== 'width' && !isNonEmptyString(val)) {
        throw new Error(`candidates: \`${key}\` must be non-empty string`);
      }
    });

    if (extensions.indexOf(c.ext.toLowerCase()) === -1) {
      console.warn(`${c.filename} has invalid extension: will not be processed`);

      return false;
    }

    return true;
  });

  return validCandidates;
}

module.exports = parseCandidates;