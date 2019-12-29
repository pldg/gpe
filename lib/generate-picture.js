function generatePicture({
  className,
  sources,
  img,
  prefix,
  ie9
}) {
  if (className) {
    className = ` ${prefix.class}class="${className}"`;
  }

  if (sources !== '') {
    // Add support for IE9
    // https://scottjehl.github.io/picturefill/examples/demo-02.html
    const openVideoTag = ie9
      ? '\n  <!--[if IE 9]><video style="display: none"><![endif]-->'
      : '';
    const closeVideoTag = ie9
      ? '\n  <!--[if IE 9]></video><![endif]-->'
      : '';

    sources = openVideoTag + sources + closeVideoTag;
  }

  return `<picture${className}>${sources}${img}
</picture>`;
}

module.exports = generatePicture;