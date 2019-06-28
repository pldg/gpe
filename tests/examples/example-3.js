const {
  generatePictureElement
} = require('../../lib/main');

module.exports = (candidates) => {
  return generatePictureElement({
    candidates,
    breakpoints: [{
      mediaQuery: '768px',
      size: '100vw',
      art: 'close-up'
    }]
  });
};