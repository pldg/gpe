/**
 * @param {Object[]} consecutiveBreakpoints
 * @returns {String[]} List of media queries and their size values.
 * @example `(min-width:900px) 25vw, (min-width:600px) 50vw, 100vw`
 */
function generateSizeWithMediaQueries(consecutiveBreakpoints) {
  const sizes = consecutiveBreakpoints.map(bp => {
    const mediaQuery = bp.mediaQuery;
    const size = bp.size;
    const isGlobalBreakpoint = mediaQuery === '0';
    const sizes = isGlobalBreakpoint ? size : `${mediaQuery} ${size}`;

    return sizes;
  });

  return sizes.join(', ');
}

module.exports = generateSizeWithMediaQueries;