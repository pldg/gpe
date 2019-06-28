/**
 * @returns {String} `<picture>` element.
 */
function generatePicture({
  className,
  sources,
  img
}) {
  className = className ? ` class="${className}"` : '';

  return `<picture${className}>${sources}${img}
</picture>`;
}

module.exports = generatePicture;