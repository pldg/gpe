const {
  isObjectLiteral
} = require('./utils/utils');

function parsePrefix(prefix) {
  if (!prefix) {
    prefix = {};
  } else if (!isObjectLiteral(prefix)) {
    throw new Error('`prefix` must be an object literal');
  }

  const keys = Object.keys(prefix);

  // Attributes that can be prefixed
  const attributes = [
    'class',
    'alt',
    'media',
    'sizes',
    'srcset',
    'src',
    'type'
  ];

  if (keys.some(k => attributes.indexOf(k) === -1)) {
    throw new Error('Invalid prefix key');
  }

  for (const attribute of attributes) {
    if (!prefix[attribute]) prefix[attribute] = '';
  }

  return prefix;
}

module.exports = parsePrefix;