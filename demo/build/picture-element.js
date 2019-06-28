const {
  generateCandidates,
  generatePictureElement
} = require('../../lib/main');

// Read files from folder with webpack
// https://webpack.js.org/guides/dependency-management/#require-context
// Returns list of filenames parsed by file-loader
function getFilenames() {
  const r = require.context('./images/processed-images', false, /\.(jpe?g|webp)$/);

  return r.keys().map(file => r(file));
}

const candidates = generateCandidates({
  filenames: getFilenames(),
  width: /_\d+w\./,
  art: /_.+_/
});

const picture = generatePictureElement({
  candidates,
  alt: 'triss merigold',
  breakpoints: [{
    mediaQuery: '1280px',
    size: '25vw'
  }, {
    size: '50vw',
    art: 'close-up'
  }]
});

module.exports = picture;