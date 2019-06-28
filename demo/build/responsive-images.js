const path = require('path');
const prims = require('prims');

prims({
  input: path.resolve(__dirname, './images'),
  convert: {
    jpeg: {},
    webp: {}
  },
  resize: {
    widths: [ 400, 800 ]
  }
});