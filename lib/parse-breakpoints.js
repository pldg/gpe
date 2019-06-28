const {
  isObjectLiteral,
  isNonEmptyString
} = require('./utils');
const extractConsecutiveBreakpoints = require('./extract-consecutive-breakpoints');
const generateSizeWithMediaQueries = require('./generate-size-with-media-queries');

function parseBreakpoints({
  breakpoints,
  candidates
}) {
  const reference_filename = candidates[0].filename;
  const _breakpoints = [];
  let globalBreakpoint;

  if (breakpoints) {
    if (!Array.isArray(breakpoints)) {
      throw new Error('`breakpoints` must be an array');
    }

    breakpoints.forEach(bp => {
      const mediaQuery = bp.mediaQuery;
      const size = bp.size;
      const art = bp.art;

      if (!isObjectLiteral(bp)) {
        throw new Error('`breakpoints` can only contains objects literal');
      }

      if (mediaQuery) {
        if (!isNonEmptyString(mediaQuery)) {
          throw new Error('`mediaQuery` must be a non-empty string');
        }

        // Errors checking
        startWithANumber(mediaQuery);
        hasValidMeasurementUnit(mediaQuery, ['px', 'em', 'rem']);

        // Set media query as mobile first
        bp.mediaQuery = `(min-width: ${bp.mediaQuery})`;
      } else {
        // A breakpoint without media query is called globalBreakpoint
        globalBreakpoint = bp;

        // Set mediaQuery to '0' to be able to sort it
        globalBreakpoint.mediaQuery = '0';
      }

      if (size) {
        if (!isNonEmptyString(size)) {
          throw new Error('`size` must be a non-empty string');
        }

        // Errors checking
        startWithANumber(size);
        hasValidMeasurementUnit(size, ['vw', 'px']);
      }

      if (art && !isNonEmptyString(art)) {
        throw new Error('`art` must be a non-empty string');
      }

      // Add candidates that have the same art direction of current breakpoint
      bp.candidatesWithSameArt = candidates.filter(c => c.art === art);

      if (bp.candidatesWithSameArt.length === 0) {
        throw new Error(
          `"${art}" art not found in candidates: "${reference_filename}"`
        );
      }

      _breakpoints.push(bp);
    });
  }

  // If user omit to set globalBreakpoint
  if (!globalBreakpoint) {
    // Add globalBreakpoint with default values
    _breakpoints.push({
      mediaQuery: '0',
      size: undefined,
      art: undefined,
      candidatesWithSameArt: candidates.filter(c => c.art === undefined)
    });

    globalBreakpoint = _breakpoints[_breakpoints.length - 1];

    if (globalBreakpoint.candidatesWithSameArt.length === 0) {
      throw new Error(
        `"${globalBreakpoint.art}" art not found in candidates: ` +
        `"${reference_filename}"`
      );
    }
  }

  if (_breakpoints.length > 1) {
    // Sort in-place breakpoints from larger to smaller media query, because we
    // use a mobile first (min-width) approach
    _breakpoints.sort((a, b) => {
      return b.mediaQuery.match(/\d+/)[0] - a.mediaQuery.match(/\d+/)[0];
    });

    // Consecutive breakpoints are breakpoints whose media queries and size can
    // be be merged inside a single sizes attribute, returns undefined if no
    // consecutive breakpoints are found
    const consecutiveBreakpoints = extractConsecutiveBreakpoints({
      breakpoints: _breakpoints,
      globalBreakpoint
    });

    if (consecutiveBreakpoints) {
      // Remove consecutiveBreakpoints from breakpoints
      _breakpoints.splice(_breakpoints.length - consecutiveBreakpoints.length);

      // Add a single breakpoint which represent the consecutiveBreakpoints
      // concatenated together
      _breakpoints.push({
        mediaQuery: '0',
        size: generateSizeWithMediaQueries(consecutiveBreakpoints),
        art: globalBreakpoint.art,
        candidatesWithSameArt: globalBreakpoint.candidatesWithSameArt
      })
    }
  }

  return _breakpoints;
}

function startWithANumber(val) {
  const startWithNum = /\d+/.test(val[0]);

  if (!startWithNum) {
    throw new Error(`"${val}" must start with a number`);
  }
}

function hasValidMeasurementUnit(val, measurementUnits) {
  const hasValidUnit = measurementUnits.some(unit => val.includes(unit));

  if (!hasValidUnit) {
    throw new Error(`"${val}" must have a valid measurement unit`);
  }
}

module.exports = parseBreakpoints;