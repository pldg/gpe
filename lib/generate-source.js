/**
 * @returns {String} `<source>` element.
 */
function generateSource({
  mediaQuery,
  size,
  srcset,
  mimeType
}) {
  const media = mediaQuery !== '0' ? `
    media="${mediaQuery}"` : '';

  const sizes = size ? `
    sizes="${size}"` : '';

  return `
  <source${media}${sizes}
    srcset="${srcset}"
    type="image/${mimeType}">`;
}

module.exports = generateSource;