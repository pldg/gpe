const generatePictureElement = require('../../lib/main');

module.exports = (candidates) => {
  return generatePictureElement({
    candidates,
    breakpoints: [{
      size: '100vw'
    }],
    placeholder: 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='
  });
};