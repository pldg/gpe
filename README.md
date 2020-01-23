# Generate Picture Element

![downloads-badge](https://img.shields.io/npm/dt/gpe.svg)

Automate [`<picture>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) element generation.

- Zero dependencies
- Auto-generate `srcset`
- Auto-generate `<source>` for each extension
- Set media queries
- Set `sizes` attribute
- Set art direction
- Add public path
- Add fallback `src` or placeholder
- Add `class` and `alt` attributes
- Add prefix to attributes

## Install

`npm install --save-dev gpe`

## Quick start

```js
const generateCandidates = require('gpe/lib/utils/generate-candidates');
const generatePictureElement = require('gpe');

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

const pictureElement = generatePictureElement({
  candidates,
  alt: 'triss',
  breakpoints: [{
    mediaQuery: '1280px',
    size: '50vw',
    art: 'close-up'
  }, {
    size: '100vw'
  }]
});
```

Output:

```html
<picture>
  <source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="triss_close-up_400w.webp 400w, triss_close-up_800w.webp 800w"
    type="image/webp">
  <source
    media="(min-width: 1280px)"
    sizes="50vw"
    srcset="triss_close-up_400w.jpg 400w, triss_close-up_800w.jpg 800w"
    type="image/jpeg">
  <source
    sizes="100vw"
    srcset="triss_400w.webp 400w, triss_800w.webp 800w"
    type="image/webp">
  <img
    alt="triss"
    sizes="100vw"
    srcset="triss_400w.jpg 400w, triss_800w.jpg 800w"
    src="triss_800w.jpg"
    type="image/jpeg">
</picture>
```

## More info

- [What is a picture element](doc/what-is-a-picture-element.md)
- [Getting started tutorial](doc/getting-started-tutorial.md)
- [Generate candidates](doc/generate-candidates.md)
- [API](doc/api.md)
- [Examples](doc/examples.md)
- [Demo](demo/)

## Test

- Run all tests: `npm run test`
- Run a specific example: `npm run example -- 1` (where `1` is the [example](tests/examples/) number)

Use [jest](https://jestjs.io) as testing library.

## Contribution

Contributions are welcome!

## Notes

Inspired by [responsivebreakpoints](https://www.responsivebreakpoints.com/) by Cloudinary.
