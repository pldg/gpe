/**
 * @returns {Number} Width to use inside `src` attribute.
 */
function setSrcWidth({
  src,
  widths
}) {
  if (src) {
    const imageHaveSrc = widths.some(w => w === src);

    if (!imageHaveSrc) {
      console.warn(
        `Warning: "${src}" width doesn't exist in candidates, ` +
        'src attribute will fallback to the max width available'
      );
    } else {
      return src;
    }
  }

  return widths[widths.length - 1];
}

module.exports = setSrcWidth;