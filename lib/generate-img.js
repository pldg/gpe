/**
 * @returns {String} `<img>` element.
 */
function generateImg({
  alt,
  size,
  srcset,
  src,
  mimeType,
  prefix
}) {
  const sizes = size ? `
    ${prefix.sizes}sizes="${size}"` : '';

  alt = alt ? `
    ${prefix.alt}alt="${alt}"` : '';

  return `
  <img${alt}${sizes}
    ${prefix.srcset}srcset="${srcset}"
    ${prefix.src}src="${src}"
    ${prefix.type}type="image/${mimeType}">`;
}

module.exports = generateImg;