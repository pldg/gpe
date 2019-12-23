const path = require('path');
const prims = require('prims');

// Covert and resize images
prims({
  input: path.resolve(__dirname, '../images'),
  convert: {
    jpeg: {},
    webp: {}
  },
  resize: {
    widths: [ 400, 800 ]
  }
});