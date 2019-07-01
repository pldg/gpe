const { isBool } = require('../lib/utils');

function parseIE9(ie9) {
  if (!ie9) return false;
  else if (!isBool(ie9)) throw new Error('`ie9` must be boolean');
  else return ie9;
}

module.exports = parseIE9;