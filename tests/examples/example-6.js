const generatePictureElement = require('../../lib/main');

module.exports = (candidates) => {
  return generatePictureElement({
    candidates,
    breakpoints: [{
      mediaQuery: '768px',
      size: '50vw',
      art: 'close-up'
    }, {
      size: '100vw'
    }]
  });
};