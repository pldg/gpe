/**
 * @param {Object[]} candidates `options.candidates`.
 * @returns {String[]} Sorted list of unique widths.
 */
function extractWidths(candidates) {
  const widths = candidates
    .map(c => c.width)
    // Remove duplicates
    .filter((c, i, arr) => arr.indexOf(c) === i)
    // Sort from lower to larger
    .sort((a, b) => a - b);

  return widths;
}

module.exports = extractWidths;