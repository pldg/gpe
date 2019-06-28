const {
  generateCandidates
} = require('../lib/main');

const candidates = generateCandidates({
  filenames: [
    'triss_400w.jpg',
    'triss_400w.webp',
    'triss_800w.jpg',
    'triss_800w.webp',
    'triss_close-up_400w.jpg',
    'triss_close-up_400w.webp',
    'triss_close-up_800w.jpg',
    'triss_close-up_800w.webp'
  ],
  width: /_\d+w\./,
  art: /_.+_/
});

module.exports = candidates;