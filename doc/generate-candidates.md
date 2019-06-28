# Generate candidates

How to use [*generate-candidates.js*](../lib/generate-candidates.js) utility.

```js
const { generateCandidates } = require('gpe');

const candidates = generateCandidates({
  filenames: [
    'triss_800w.jpg',
    'triss_close-up_800w.jpg'
  ],
  width: /_\d+w\./,
  art: /_.+_/
});
```

Output [`candidates`](api.md#options.candidates) array will be:

```js
[
  {
    filename: "triss_800w.jpg",
    ext: "jpg",
    width: 800,
    art: undefined
  },
  {
    filename: "triss_close-up_800w.jpg",
    ext: "jpg",
    width: 800,
    art: "close-up"
  }
]
```

The `generateCandidates` utility works by extracting `ext`, `width` and `art` directly from filename using regular expressions. If you use a different naming convention, change regex accordingly.

## API

### `options`

*Required* <br>
*Type:* `Object`

### `options.filenames`

*Required* <br>
*Type:* `String[]`

List of `filename.ext` images.

### `options.width`

*Required* <br>
*Type:* `Regex`

Regex to select `width` inside filename. `generateCandidates` will automatically match only the numbers. Filenames must always have width.

#### `options.art`

*Optional* <br>
*Type:* `Regex` <br>
*Default:* `undefined`

Regex to select `art` inside filename. Non-alphanumeric chars at begin and end will be removed. A Filename may not have art, if no match is found `art` will be set as undefined. If all filenames do not have art direction, `art` option can be omitted.
