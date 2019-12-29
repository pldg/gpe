const {
  isNonEmptyString
} = require('./utils/utils');

function generateImg({
  alt,
  size,
  srcset,
  src,
  mimeType,
  prefix,
  placeholder,
  placeholder_srcset,
  placeholder_src
}) {
  const sizes = size ?
    `\n    ${prefix.sizes}sizes="${size}"` : '';

  if (alt) alt = `\n    ${prefix.alt}alt="${alt}"`;

  if (isNonEmptyString(placeholder)) {
    placeholder_src = `\n    src="${placeholder}"`;
    prefix.src = prefix.src ? prefix.src : 'data-';
    placeholder_srcset = '';
  } else if (placeholder === true) {
    placeholder_src = `\n    src="${placeholder_src}"`;
    placeholder_srcset = `\n    srcset="${placeholder_srcset}"`;
    prefix.srcset = prefix.srcset ? prefix.srcset : 'data-';
    prefix.src = prefix.src ? prefix.src : 'data-';
  } else if (!placeholder) {
    placeholder_src = '';
    placeholder_srcset = '';
  }

  return `
  <img${alt}${sizes}
    ${prefix.srcset}srcset="${srcset}"${placeholder_srcset}
    ${prefix.src}src="${src}"${placeholder_src}
    ${prefix.type}type="image/${mimeType}">`;
}

module.exports = generateImg;