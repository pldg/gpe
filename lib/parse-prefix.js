const {
  isObjectLiteral
} = require('./utils');

function parsePrefix(prefix) {
  if (!prefix) prefix = {};

  if (!isObjectLiteral(prefix)) {
    throw new Error('`prefix` must be an object literal');
  }

  const prefixKeys = Object.keys(prefix);

  const validPrefixes = [
    'class',
    'alt',
    'media',
    'sizes',
    'srcset',
    'src',
    'type'
  ];

  for (const key of validPrefixes) {
    if (prefix[key] && prefixKeys.indexOf(key) === -1) {
      throw new Error(`invalid \`prefix\` key: "${key}"`);
    }

    if (!prefix[key]) prefix[key] = '';
  }

  return prefix;
}

module.exports = parsePrefix;