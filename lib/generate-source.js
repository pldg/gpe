function generateSource({
  mediaQuery,
  size,
  srcset,
  mimeType,
  prefix,
  placeholder_srcset
}) {
  const media = mediaQuery !== '0' ?
    `\n    ${prefix.media}media="${mediaQuery}"` : '';

  const sizes = size ?
    `\n    ${prefix.sizes}sizes="${size}"` : '';

  if (placeholder_srcset) {
    prefix.srcset = prefix.srcset ? prefix.srcset : 'data-';
    placeholder_srcset = `\n    srcset="${placeholder_srcset}"`;
  } else {
    placeholder_srcset = '';
  }

  return `
  <source${media}${sizes}
    ${prefix.srcset}srcset="${srcset}"${placeholder_srcset}
    ${prefix.type}type="image/${mimeType}">`;
}

module.exports = generateSource;