const parseExtensions = require('./parse-extensions');
const parseCandidates = require('./parse-candidates');
const parseBreakpoints = require('./parse-breakpoints');
const parsePublicPath = require('./parse-public-path');
const parseAlt = require('./parse-alt');
const parseClassName = require('./parse-class-name');
const parseSrc = require('./parse-src');
const parsePrefix = require('./parse-prefix');
const extractExtensions = require('./extract-extensions');
const extractWidths = require('./extract-widths');
const setCorrectMimeType = require('./set-correct-mime-type');
const generateSrcset = require('./generate-srcset');
const generateSource = require('./generate-source');
const setSrcWidth = require('./set-src-width');
const generateSrc = require('./generate-src');
const generateImg = require('./generate-img');
const generatePicture = require('./generate-picture');
const generateCandidates = require('./generate-candidates');

/**
 * Generate a `<picture>` element. Read the
 * [documentation](https://github.com/pldg/gpe) for more info.
 *
 * @param {Object} options
 *
 * @param {Object[]} options.candidates List of
 * `{ filename, ext, width, art }` objects, all properties are required.
 *
 * @param {String[]} [options.extensions] List of extensions. Extension index
 * determinate the order of `<source>` elements. Last extension is used inside
 * `<img>` element.
 *
 * @param {Object[]} [options.breakpoints] List of `{ mediaQuery, size, art }`
 * objects, all properties are optional.
 * @param {String} [options.breakpoints[].mediaQuery] Define a mobile first
 * `(min-width)` media query for current breakpoint. You must set a measurement
 * unit: `px` or `em` or `rem`.
 * @param {String} [options.breakpoints[].size] Specify the intended display
 * size of the image for current breakpoint. You must set a measurement unit:
 * `vw` or `px`. Affect viewports specified by `mediaQuery`.
 * @param {String} [options.breakpoints[].art] Define the art direction of the
 * image to use for current breakpoint. Affect viewports specified by
 * `mediaQuery`.
 *
 * @param {String} [options.publicPath] Specifies a base url for all images. You
 * must add a slash at the end.
 *
 * @param {String} [options.alt] Alt attribute for `<img>` element.
 *
 * @param {String} [options.className] Class attribute for `<picture>` element.
 *
 * @param {Number} [options.src] Fallback width for `src` attribute.
 *
 * @param {Object} [options.prefix] Prefixes for attributes (you must add hyphen
 * at the end).
 * @param {String} [options.prefix.class]
 * @param {String} [options.prefix.alt]
 * @param {String} [options.prefix.media]
 * @param {String} [options.prefix.sizes]
 * @param {String} [options.prefix.srcset]
 * @param {String} [options.prefix.src]
 * @param {String} [options.prefix.type]
 *
 * @returns {String} A `<picture>` element.
 */
function generatePictureElement(options) {
  const extensions = parseExtensions(options.extensions);
  const candidates = parseCandidates({
    candidates: options.candidates,
    extensions
  });
  const breakpoints = parseBreakpoints({
    breakpoints: options.breakpoints,
    candidates
  });
  const publicPath = parsePublicPath(options.publicPath);
  const alt = parseAlt(options.alt);
  const className = parseClassName(options.className);
  const src = parseSrc(options.src);
  const prefix = parsePrefix(options.prefix);
  let sources = '';
  let img = '';

  // Generate <source> and <img>
  breakpoints.forEach((bp, i, arr) => {
    const size = bp.size;
    const mediaQuery = bp.mediaQuery;
    const candidatesWithSameArt = bp.candidatesWithSameArt;

    // Sorted list of unique extensions
    const _extensions = extractExtensions({
      candidates: candidatesWithSameArt,
      extensions
    });

    // If current breakpoint have mediaQuery, create <source> with fallback
    // extension; otherwise exclude fallback extension
    const l = mediaQuery !== '0' ? _extensions.length : _extensions.length - 1;

    // Generate one <source> element for each extension
    for (let j = 0; j < l; j++) {
      const ext = _extensions[j];

      const candidatesWithSameArtAndExt = candidatesWithSameArt
        .filter(c => c.ext === ext);

      const srcset = generateSrcset({
        widths: extractWidths(candidatesWithSameArtAndExt),
        publicPath,
        candidatesWithSameArtAndExt
      });

      sources += generateSource({
        mimeType: setCorrectMimeType(ext),
        mediaQuery,
        size,
        srcset,
        prefix
      });
    }

    // Generate <img> only when globalBreakpoint (or consecutiveBreakpoints)
    // its processed
    if (i === arr.length - 1) {
      const fallbackExt = _extensions[_extensions.length - 1];

      const candidatesWithSameArtAndExt = candidatesWithSameArt
        .filter(c => c.ext === fallbackExt);

      const widths = extractWidths(candidatesWithSameArtAndExt);

      const srcset = generateSrcset({
        publicPath,
        widths,
        candidatesWithSameArtAndExt
      });

      const width = setSrcWidth({
        reference_filename: candidatesWithSameArtAndExt[0].filename,
        src,
        widths
      });

      const _src = generateSrc({
        width,
        candidatesWithSameArtAndExt,
        publicPath
      });

      img = generateImg({
        mimeType: setCorrectMimeType(fallbackExt),
        src: _src,
        alt,
        size,
        srcset,
        prefix
      });
    }
  });

  return generatePicture({
    className,
    sources,
    img,
    prefix
  });
}

module.exports = {
  generateCandidates,
  generatePictureElement
};