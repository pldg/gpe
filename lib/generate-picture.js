/**
 * @returns {String} `<picture>` element.
 */
function generatePicture({
  className,
  sources,
  img,
  prefix
}) {
  className = className ? ` ${prefix.class}class="${className}"` : '';

  return `<picture${className}>${sources}${img}
</picture>`;
}

module.exports = generatePicture;