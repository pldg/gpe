const {
  consecutiveValues
} = require('./utils');

/**
 * Consecutive breakpoints are breakpoints whose media queries and size can be
 * merged inside a *sizes* attribute. They must have the same art of the
 * *globalBreakpoint* and they must have size property declared.
 *
 * Example: `sizes="(min-width:900px) 25vw, (min-width:600px) 50vw, 100vw"`.
 *
 * @see {@link generate-size-with-media-queries.js} for more information.
 *
 * @returns {Object[]|undefined} List of consecutive breakpoints; otherwise
 * `undefined`.
 */
function extractConsecutiveBreakpoints({
  breakpoints,
  globalBreakpoint
}) {
  // Global breakpoint must exist and must have size property
  if (globalBreakpoint && globalBreakpoint.size) {
    // Copy breakpoints and reverse it
    const reversedBreakpoints = breakpoints
      .map(bp => Object.assign({}, bp))
      .reverse();

    // Consecutive breakpoints must have the same art
    const consecutiveBreakpoints = consecutiveValues(
      reversedBreakpoints,
      'art',
      globalBreakpoint.art
    );

    // All consecutive breakpoints must have a size property
    const haveSizes = consecutiveBreakpoints.every(bp => bp.size);

    if (consecutiveBreakpoints.length > 1 && haveSizes) {
      return consecutiveBreakpoints.reverse();
    }
  }
}

module.exports = extractConsecutiveBreakpoints;