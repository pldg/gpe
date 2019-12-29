const generatePictureElement = require('../../lib/main');

module.exports = (candidates) => {
  return generatePictureElement({
    candidates,
    breakpoints: [{
      mediaQuery: '768px',
      size: '50vw'
    }, {
      size: '100vw',
      art: 'close-up'
    }],
    placeholder: true
  });
};