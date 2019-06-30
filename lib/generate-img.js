/**
 * @returns {String} `<img>` element.
 */
function generateImg({
  alt,
  size,
  srcset,
  src,
  mimeType,
  prefix,
  placeholder
}) {
  const sizes = size ? `
    ${prefix.sizes}sizes="${size}"` : '';

  if (alt) {
    alt = `
    ${prefix.alt}alt="${alt}"`;
  }

  if (placeholder) {
    placeholder = `
    src="${placeholder}"`;

    prefix.src = prefix.src ? prefix.src : 'data-';
  }

  return `
  <img${alt}${sizes}
    ${prefix.srcset}srcset="${srcset}"
    ${prefix.src}src="${src}"${placeholder}
    ${prefix.type}type="image/${mimeType}">`;
}

module.exports = generateImg;