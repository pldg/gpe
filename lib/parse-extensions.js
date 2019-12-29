const {
  isNonEmptyString
} = require('./utils/utils');

/**
 * Ext with lower index comes first. Example: `<source>` with *webp* comes
 * before of `<source>` with *jpeg*.
 */
function parseExtensions(extensions) {
  if (!extensions) {
    extensions = [
      'webp',
      'jp2',
      'jxr',
      'tiff',
      'png',
      'bmp',
      'jpg',
      'jpeg'
    ];
  } else {
    if (!Array.isArray(extensions)) {
      throw new Error('`extensions` must be an array');
    }

    extensions.forEach(ext => {
      if (!isNonEmptyString(ext)) {
        throw new Error('`extensions` can contain only non-empty strings');
      }

      if (ext[0] === '.') throw new Error('`ext` must be without point');
    });
  }

  return extensions;
}

module.exports = parseExtensions;