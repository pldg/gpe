/**
 * @param {Object[]} candidates `options.candidates`.
 * @param {String[]} extensions `options.extensions`.
 *
 * @returns {String[]} Sorted list of unique extensions.
 *
 * To change ext priority change the order of `extensions` elements.
 */
function extractExtensions({
  candidates,
  extensions
}) {
  return candidates
    .map(c => c.ext)
    // Remove duplicates
    .filter((c, i, arr) => arr.indexOf(c) === i)
    // Sort based on extensions index, lower index comes first
    .sort((a, b) => extensions.indexOf(a) - extensions.indexOf(b));
}

module.exports = extractExtensions;