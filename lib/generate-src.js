/**
 * @returns {String} Image path for `src` attribute.
 */
function generateSrc({
  width,
  candidatesWithSameArtAndExt,
  publicPath
}) {
  // Get candidate that contain current width
  const candidate = candidatesWithSameArtAndExt
    .filter(c => c.width === width)
    [0];

  // Filepath
  return publicPath + candidate.filepath;
}

module.exports = generateSrc;