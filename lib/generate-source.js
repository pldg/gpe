/**
 * @returns {String} `<source>` element.
 */
function generateSource({
  mediaQuery,
  size,
  srcset,
  mimeType,
  prefix
}) {
  const media = mediaQuery !== '0' ? `
    ${prefix.media}media="${mediaQuery}"` : '';

  const sizes = size ? `
    ${prefix.sizes}sizes="${size}"` : '';

  return `
  <source${media}${sizes}
    ${prefix.srcset}srcset="${srcset}"
    ${prefix.type}type="image/${mimeType}">`;
}

module.exports = generateSource;