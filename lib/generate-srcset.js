/**
 * @returns {String} Image paths with their w-descriptors.
 */
function generateSrcset({
  candidatesWithSameArtAndExt,
  widths,
  publicPath
}) {
  const srcset = widths.map(width => {
    // Get candidate that contain current width
    const candidate = candidatesWithSameArtAndExt
      .filter(c => c.width === width)
      [0];

    // Filepath
    return publicPath + candidate.filepath + ` ${width}w`;
  });

  // Comma separated list of file paths
  return srcset.join(', ');
}

module.exports = generateSrcset;