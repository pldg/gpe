# Examples

Candidates are the same for all examples below.

```js
const candidates = generateCandidates({
  filepaths: [
    'triss_200w.jpg',
    'triss_200w.webp',
    'triss_400w.jpg',
    'triss_400w.webp',
    'triss_800w.jpg',
    'triss_800w.webp',
    'triss_close-up_200w.jpg',
    'triss_close-up_200w.webp',
    'triss_close-up_400w.jpg',
    'triss_close-up_400w.webp',
    'triss_close-up_800w.jpg',
    'triss_close-up_800w.webp'
  ],
  width: /_\d+w\./,
  art: /_.+_/
});
```

## Consecutive breakpoints

If a set of consecutive breakpoints have the same `art` of *globalBreakpoint* (which is the breakpoint without media query) and if they all have `size` declared; then they'll be merged inside *sizes* attribute.

```js
generatePictureElement({
  candidates,
  breakpoints: [{
    mediaQuery: '1280px',
    size: '50vw'
  }, {
    size: '100vw'
  }]
});
```

<Details>
  <Summary>Output (click to expand)</Summary>

  ```html
  <picture>
    <source
      sizes="(min-width: 1280px) 50vw, 100vw"
      srcset="triss_200w.jpg 200w, triss_400w.webp 400w, triss_800w.webp 800w"
      type="image/webp">
    <img
      sizes="(min-width: 1280px) 50vw, 100vw"
      srcset="triss_200w.jpg 200w, triss_400w.jpg 400w, triss_800w.jpg 800w"
      src="triss_800w.jpg"
      type="image/jpeg">
  </picture>
  ```

</Details>

## Breakpoints with different art

If art direction isn't the same, breakpoints can't be merged.

```js
generatePictureElement({
  candidates,
  breakpoints: [{
    mediaQuery: '1280px',
    size: '50vw'
  }, {
    size: '100vw',
    art: 'close-up'
  }]
});
```

<Details>
  <Summary>Output (click to expand)</Summary>

  ```html
  <picture>
    <source
      media="(min-width: 1280px)"
      sizes="50vw"
      srcset="triss_200w.jpg 200w, triss_400w.webp 400w, triss_800w.webp 800w"
      type="image/webp">
    <source
      media="(min-width: 1280px)"
      sizes="50vw"
      srcset="triss_200w.jpg 200w, triss_400w.jpg 400w, triss_800w.jpg 800w"
      type="image/jpeg">
    <source
      sizes="100vw"
      srcset="triss_close-up_200w.jpg 200w, triss_close-up_400w.webp 400w, triss_close-up_800w.webp 800w"
      type="image/webp">
    <img
      sizes="100vw"
      srcset="triss_close-up_200w.jpg 200w, triss_close-up_400w.jpg 400w, triss_close-up_800w.jpg 800w"
      src="triss_close-up_800w.jpg"
      type="image/jpeg">
  </picture>
  ```

</Details>

## Three breakpoints

Last two breakpoints are merged while the first one is not.

```js
generatePictureElement({
  candidates,
  breakpoints: [{
    mediaQuery: '1280px',
    size: '25vw'
  }, {
    mediaQuery: '768px',
    size: '50vw',
    art: 'close-up'
  }, {
    size: '100vw',
    art: 'close-up'
  }]
});
```

<Details>
  <Summary>Output (click to expand)</Summary>

  ```html
  <picture>
    <source
      media="(min-width: 1280px)"
      sizes="25vw"
      srcset="triss_200w.jpg 200w, triss_400w.webp 400w, triss_800w.webp 800w"
      type="image/webp">
    <source
      media="(min-width: 1280px)"
      sizes="25vw"
      srcset="triss_200w.jpg 200w, triss_400w.jpg 400w, triss_800w.jpg 800w"
      type="image/jpeg">
    <source
      sizes="(min-width: 768px) 50vw, 100vw"
      srcset="triss_close-up_200w.jpg 200w, triss_close-up_400w.webp 400w, triss_close-up_800w.webp 800w"
      type="image/webp">
    <img
      sizes="(min-width: 768px) 50vw, 100vw"
      srcset="triss_close-up_200w.jpg 200w, triss_close-up_400w.jpg 400w, triss_close-up_800w.jpg 800w"
      src="triss_close-up_800w.jpg"
      type="image/jpeg">
  </picture>
  ```

</Details>

## Additional options

Add `publicPath`, `src`, `alt`, `className`, `prefix` options.

```js
generatePictureElement({
  candidates,
  publicPath: 'images/',
  src: 400,
  alt: 'triss',
  className: 'triss-picture',
  prefix: {
    srcset: 'data-',
    src: 'data-'
  },
  breakpoints: [{
    size: '100vw'
  }]
});
```

<Details>
  <Summary>Output (click to expand)</Summary>

  ```html
  <picture class="triss-picture">
    <source
      sizes="100vw"
      data-srcset="images/triss_200w.jpg 200w, images/triss_400w.webp 400w, images/triss_800w.webp 800w"
      type="image/webp">
    <img
      alt="triss"
      sizes="100vw"
      data-srcset="images/triss_200w.jpg 200w, images/triss_400w.jpg 400w, images/triss_800w.jpg 800w"
      data-src="images/triss_400w.jpg"
      type="image/jpeg">
  </picture>
  ```

</Details>

## Placeholder 1

Use `placeholder` to add a [low quality image](https://css-tricks.com/preventing-content-reflow-from-lazy-loaded-images/#article-header-id-2) as *src* attribute. It'll automatically output *data-src* attribute. If you want you can change *data-* using `prefix` option. This option is useful to avoid content reflow while lazy loading the picture element.

```js
generatePictureElement({
  candidates,
  breakpoints: [{
    size: '100vw'
  }],
  placeholder: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='background-color:transparent' viewBox='0 0 1 1'%3E%3C/svg%3E"
});
```

<Details>
  <Summary>Output (click to expand)</Summary>

  ```html
  <picture>
    <source
      sizes="100vw"
      srcset="triss_200w.jpg 200w, triss_400w.webp 400w, triss_800w.webp 800w"
      type="image/webp">
    <img
      sizes="100vw"
      srcset="triss_200w.jpg 200w, triss_400w.jpg 400w, triss_800w.jpg 800w"
      data-src="triss_800w.jpg"
      src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='background-color:transparent' viewBox='0 0 1 1'%3E%3C/svg%3E"
      type="image/jpeg">
  </picture>
  ```

</Details>

## Placeholder 2

Set `placeholder` to `true` instead of string will use the smallest width as placeholder.

```js
generatePictureElement({
  candidates,
  breakpoints: [{
    size: '100vw'
  }],
  placeholder: true
});
```

<Details>
  <Summary>Output (click to expand)</Summary>

  ```html
  <picture>
    <source
      sizes="100vw"
      data-srcset="triss_400w.webp 400w, triss_800w.webp 800w"
      srcset="triss_200w.jpg 200w"
      type="image/webp">
    <img
      sizes="100vw"
      data-srcset="triss_400w.jpg 400w, triss_800w.jpg 800w"
      srcset="triss_200w.jpg 400w"
      data-src="triss_800w.jpg"
      src="triss_200w.jpg"
      type="image/jpeg">
  </picture>
  ```

</Details>
