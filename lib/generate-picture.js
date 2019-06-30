/**
 * @returns {String} `<picture>` element.
 */
function generatePicture({
  className,
  sources,
  img,
  prefix
}) {
  if (className) {
    className = ` ${prefix.class}class="${className}"`;
  }

  return `<picture${className}>${sources}${img}
</picture>`;
}

module.exports = generatePicture;