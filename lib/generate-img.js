/**
 * @returns {String} `<img>` element.
 */
function generateImg({
  alt,
  size,
  srcset,
  src,
  mimeType
}) {
  const sizes = size ? `
    sizes="${size}"` : '';

  alt = alt ? `
    alt="${alt}"` : '';

  return `
  <img${alt}${sizes}
    srcset="${srcset}"
    src="${src}"
    type="image/${mimeType}">`;
}

module.exports = generateImg;