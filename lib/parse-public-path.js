const {
  isNonEmptyString
} = require('./utils/utils');

function parsePublicPath(publicPath) {
  if (!publicPath) {
    publicPath = '';
  } else if (!isNonEmptyString(publicPath)) {
    throw new Error('`publicPath` must be a non-empty string');
  }

  return publicPath;
}

module.exports = parsePublicPath;