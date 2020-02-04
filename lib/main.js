const parseExtensions = require('./parse-extensions');
const parseCandidates = require('./parse-candidates');
const parseBreakpoints = require('./parse-breakpoints');
const parsePublicPath = require('./parse-public-path');
const parseAlt = require('./parse-alt');
const parseClassName = require('./parse-class-name');
const parseSrc = require('./parse-src');
const parsePlaceholder = require('./parse-placeholder');
const parsePrefix = require('./parse-prefix');
const parseIE9 = require('./parse-ie9');
const extractExtensions = require('./extract-extensions');
const extractSrcsetWidths = require('./extract-srcset-widths');
const extractSrcWidth = require('./extract-src-width');
const generateSrcset = require('./generate-srcset');
const generateSource = require('./generate-source');
const generateSrc = require('./generate-src');
const generateImg = require('./generate-img');
const generatePicture = require('./generate-picture');

/**
 * Generate a `<picture>` element. Read the
 * [documentation](https://github.com/pldg/gpe) for more info.
 *
 * @param {Object} options
 *
 * @param {Object[]} options.candidates List of `{ filepath, ext, width, art }`
 * objects.
 *
 * @param {String[]} [options.extensions] List of extensions to determinate the
 * order of `<source>` elements.
 *
 * @param {Object[]} [options.breakpoints] List of `{ mediaQuery, size, art }`
 * objects, all properties are optional.
 * @param {String} [options.breakpoints[].mediaQuery] Define a mobile first
 * `(min-width)` media query for current breakpoint.
 * @param {String} [options.breakpoints[].size] Specify the intended display
 * size of the image for current breakpoint.
 * @param {String} [options.breakpoints[].art] Define the art direction of the
 * image to use for current breakpoint.
 *
 * @param {String} [options.publicPath] Specifies a base url for all images.
 *
 * @param {String} [options.alt] Alt attribute for `<img>` element.
 *
 * @param {String} [options.className] Class attribute for `<picture>` element.
 *
 * @param {Number} [options.src] Fallback width for `src` attribute.
 *
 * @param {Object} [options.prefix] Prefixes for attributes.
 * @param {String} [options.prefix.class]
 * @param {String} [options.prefix.alt]
 * @param {String} [options.prefix.media]
 * @param {String} [options.prefix.sizes]
 * @param {String} [options.prefix.srcset]
 * @param {String} [options.prefix.src]
 * @param {String} [options.prefix.type]
 *
 * @param {String|Boolean} [options.placeholder] Set a placeholder for *src*
 * and/or *srcset* attribute.
 *
 * @param {Boolean} [options.ie9] Add conditional comments for Internet Explorer
 * support. Defaults to `false`.
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
  const placeholder = parsePlaceholder(options.placeholder);
  const prefix = parsePrefix(options.prefix);
  const ie9 = parseIE9(options.ie9);
  let src = parseSrc(options.src);
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

      const widths = extractSrcsetWidths(candidatesWithSameArtAndExt);

      let placeholder_srcset;

      if (placeholder === true) {
        placeholder_srcset = generateSrcset({
          widths: [ widths.shift() ],
          publicPath,
          candidatesWithSameArtAndExt
        });
      }

      const srcset = generateSrcset({
        widths,
        publicPath,
        candidatesWithSameArtAndExt
      });

      const mimeType = setCorrectMimeType(ext);

      sources += generateSource({
        mimeType,
        mediaQuery,
        size,
        srcset,
        prefix,
        placeholder_srcset
      });
    }

    // Generate <img> only when globalBreakpoint (or consecutiveBreakpoints)
    // its processed
    if (i === arr.length - 1) {
      const fallbackExt = _extensions[_extensions.length - 1];

      const candidatesWithSameArtAndExt = candidatesWithSameArt
        .filter(c => c.ext === fallbackExt);

      const widths = extractSrcsetWidths(candidatesWithSameArtAndExt);

      let placeholder_width;
      let placeholder_srcset;
      let placeholder_src;

      if (placeholder === true) {
        placeholder_width = widths.shift();

        placeholder_srcset = generateSrcset({
          widths: [ placeholder_width ],
          publicPath,
          candidatesWithSameArtAndExt
        });

        placeholder_src = generateSrc({
          width: placeholder_width,
          publicPath,
          candidatesWithSameArtAndExt
        });
      }

      const srcset = generateSrcset({
        publicPath,
        widths,
        candidatesWithSameArtAndExt
      });

      const width = extractSrcWidth({
        src,
        widths
      });

      src = generateSrc({
        width,
        candidatesWithSameArtAndExt,
        publicPath
      });

      const mimeType = setCorrectMimeType(fallbackExt);

      img = generateImg({
        mimeType,
        src,
        alt,
        size,
        srcset,
        prefix,
        placeholder,
        placeholder_srcset,
        placeholder_src
      });
    }
  });

  return generatePicture({
    className,
    sources,
    img,
    prefix,
    ie9
  });
}

function setCorrectMimeType(ext) {
  // Correct jpg mime type
  // https://stackoverflow.com/a/37266399/
  if (ext === 'jpg') return 'jpeg';
  else return ext;
}

module.exports = generatePictureElement;