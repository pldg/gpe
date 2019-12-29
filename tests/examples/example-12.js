const generatePictureElement = require('../../lib/main');

module.exports = (candidates) => {
  return generatePictureElement({
    candidates,
    breakpoints: [{
      size: '100vw'
    }],
    src: 400
  });
};