# Getting started

Step by step guide on how to generate a picture element:

1. [Generate responsive images](#generate-responsive-images)
2. [Read image files](#read-image-files)
3. [Generate candidates](#generate-candidates)
4. [Generate picture element](#generate-picture-element)

## Generate responsive images

Resize and convert an image according with your needs, as result you'll have a list of images with different sizes and formats. You can use [prims](https://github.com/pldg/prims), a program I build to easily deal with this task.

## Read image files

There are a couple of ways to read files from a directory using nodejs, you can see my [stackoverflow answer](https://stackoverflow.com/a/49601340/) on this topic.

If you use Webpack, you can import all images from a folder with [require.context](https://github.com/pldg/learn-webpack/tree/master/require-context) function.

A list of filenames may look like this:

```js
const filenames = [
  'triss_400w.jpg',
  'triss_400w.webp',
  'triss_800w.jpg',
  'triss_800w.webp'
]
```

You can use whatever naming convention you want.

## Generate candidates

The [main program](#generate-picture-element) require at least one option called `candidates` which is a list of objects:

```js
{ filename, ext, width, art }
```

Each object represent a single file (a candidate image).

You can generate `candidates` with the built in `generateCandidates` utility:

```js
const { generateCandidates } = require('gpe');

const candidates = generateCandidates({
  filenames,
  width: /_\d+w\./
});
```

The `generateCandidates` utility extract data from filenames using regex. Go to [generate candidates](generate-candidates.md) page for more info on how to use it. If this utility doesn't fit your needs you can create your own script.

## Generate picture element

The most simple way to generate a picture element is to execute `generatePictureElement` (the main program) with only the `candidates` option:

```js
const { generatePictureElement } = require('gpe');

const pictureElement = generatePictureElement({
  candidates
});
```

It'll produce this output:

```html
<picture>
  <source
    srcset="triss_400w.webp 400w, triss_800w.webp 800w"
    type="image/webp">
  <img
    srcset="triss_400w.jpg 400w, triss_800w.jpg 800w"
    src="triss_800w.jpg"
    type="image/jpeg">
</picture>
```

You may want to pass other options to achieve a different output. More info at [API](./api.md) page. See also [examples](examples.md) and [demo](../demo/).

*Note:* If *srcset* has *width descriptor* the [sizes attribute](https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-sizes) should also be present (in the example above [`size`](api.md#optionsbreakpointssize) is omitted to keep it simple).
