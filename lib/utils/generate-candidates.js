const {
  isNonEmptyString
} = require('./utils');

/**
 * Extract data from filenames, generate a list of candidates objects.
 *
 * - A candidate is an object representing a single file.
 * - An image is a collection of candidates.
 * - Set of candidates with the same art may have different extensions and
 *   widths.
 *
 * @param {String[]} filenames List of `filename.ext` images.
 * @param {Regex} width Regex to select `width` inside filename. Only numbers
 * will be matched. Filenames must always have width.
 * @param {Regex} [art] Regex to select `art` inside filename. Non-alphanumeric
 * chars at begin and end will be removed. A filename may not have art, if no
 * match is found art will be set as undefined. If all filenames do not have art
 * direction, `art` option can be omitted.
 *
 * @returns {Object[]} List of candidates `{ filename, ext, width, art }`.
 */
function generateCandidates({
  filenames,
  width,
  art
}) {
  if (!filenames) throw new Error('`filenames` is required');
  if (!width) throw new Error('`width` is required');

  return filenames.map(filename => {
    if (!isNonEmptyString(filename)) throw new Error(
      `Invalid filename: "${filename}": must be a non-empty string`
    );

    const ext = filename.match(/(?:\.([^.]+))?$/)[1];

    if (!ext) throw new Error(
      `Invalid filename: "${filename}": missing extension`
    );

    let widthMatch = filename.match(width);

    if (!widthMatch) throw new Error(
      `Invalid filename: "${filename}": \`width\` not found`
    );

    widthMatch = parseInt(widthMatch[0].match(/\d+/)[0]);

    let artMatch = art ? filename.match(art) : null;

    if (artMatch) {
      // Remove non-alphanumeric chars at end and begin
      artMatch = artMatch[0]
        .replace(/[^A-Za-z0-9]+$/, '')
        .replace(/[^A-Za-z0-9]+/, '');
    } else {
      artMatch = undefined
    }

    return {
      width: widthMatch,
      art: artMatch,
      filename,
      ext
    };
  });
}

module.exports = generateCandidates;