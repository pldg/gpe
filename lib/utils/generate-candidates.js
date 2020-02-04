const {
  isNonEmptyString
} = require('./utils');

/**
 * Extract data from filepaths, generate a list of candidates objects.
 *
 * - A candidate is an object representing a single file.
 * - An image is a collection of candidates.
 * - Set of candidates with the same art may have different extensions and
 *   widths.
 *
 * @param {String[]} filepaths List of `filename.ext` or `some_path/filename.ext`
 * @param {Regex} width Regex to select `width` inside filename. Only numbers
 * will be matched. Filenames must always have width.
 * @param {Regex} [art] Regex to select `art` inside filename. Non-alphanumeric
 * chars at begin and end will be removed. A filename may not have art, if no
 * match is found art will be set as undefined. If all filenames do not have art
 * direction, `art` option can be omitted.
 *
 * @returns {Object[]} List of candidates `{ filepath, ext, width, art }`.
 */
function generateCandidates({
  filepaths,
  width,
  art
}) {
  if (!filepaths) throw new Error('`filepaths` is required');
  if (!width) throw new Error('`width` is required');

  return filepaths.map(filepath => {
    if (!isNonEmptyString(filepath)) throw new Error(
      `Invalid filepath: "${filepath}": must be a non-empty string`
    );

    // User will use regex to select width and art from filename, so we need to
    // extract filename from filepath: https://stackoverflow.com/a/423385/
    const filename = filepath.replace(/^.*[\\\/]/, '');

    const ext = filename.match(/(?:\.([^.]+))?$/)[1];

    if (!ext) throw new Error(
      `Invalid filename: "${filepath}": missing extension`
    );

    let widthMatch = filename.match(width);

    if (!widthMatch) throw new Error(
      `Invalid filename: "${filepath}": \`width\` not found`
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
      filepath,
      ext
    };
  });
}

module.exports = generateCandidates;