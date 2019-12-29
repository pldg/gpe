const path = require('path');
const prims = require('prims');

// Covert and resize images
prims({
  input: path.resolve(__dirname, '../images'),
  output: path.resolve(__dirname, '../images/responsive-images'),
  convert: {
    jpeg: {},
    webp: {}
  },
  resize: {
    widths: [ 300, 600, 900 ]
  }
});