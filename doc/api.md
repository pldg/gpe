# API

## `options`

*Required* <br>
*Type:* `Object`

### `options.candidates`

*Required* <br>
*Type:* `Object[]`

List of `{ filepath, ext, width, art }` objects.

| Required Key | Type | Description |
|--|--|--|
| `filepath` | `string` | `filename.exe` or `some_path/filename.exe` |
| `ext` | `string` | Extension without dot |
| `width` | `number` | Width dimension in px |
| `art` | `string \|\| undefined` | Art direction |

A candidate is an object representing a single file.

An image is a collection of candidates.

Set of candidates with the same art may have different extensions and widths.

### `options.extensions`

*Optional* <br>
*Type:* `String[]` <br>
*Default:* `['webp', 'jp2', 'jxr', 'tiff', 'png', 'bmp', 'jpg', 'jpeg']`

List of extensions to determinate the order of `<source>` elements. For example (by default) `<source>` with `webp` will come before `<source>` with `png`, and the last extension `jpeg` is used as fallback inside `<img>`.

### `options.breakpoints`

*Optional* <br>
*Type:* `Object[]` <br>
*Default:* `[]`

List of `{ mediaQuery, size, art }` objects. Properties are optional. Breakpoints will be sorted from larger to smaller media query.

#### `options.breakpoints[].mediaQuery`

*Optional* <br>
*Type:* `String` <br>
*Default:* `undefined`

Define a mobile first `(min-width)` media query for current breakpoint. You must set a measurement unit: `px` or `em` or `rem`. For example `mediaQuery: '600px'` will affect only viewport width from 600px and up. A breakpoint without media query (also called *globalBreakpoint*) will affect all viewport widths.

#### `options.breakpoints[].size`

*Optional* <br>
*Type:* `String` <br>
*Default:* `undefined`

Specify the intended display size of the image for current breakpoint. You must set a measurement unit: `vw` or `px`. For example `size: '50vw'` will set `sizes` attribute to 50vw. Affect viewports specified by `mediaQuery`.

#### `options.breakpoints[].art`

*Optional* <br>
*Type:* `String` <br>
*Default:* `undefined`

Define the art direction of the image to use for current breakpoint. For example `art: 'close-up'` tells the program to use candidates with `art === 'close-up'`. Affect viewports specified by `mediaQuery`.

### `options.publicPath`

*Optional* <br>
*Type:* `String` <br>
*Default:* `''`

Specifies a base url for all images. Urls will be re-written to begin with `publicPath` value. You must add a slash at the end. For example `publicPath: 'assets/'`.

### `options.alt`

*Optional* <br>
*Type:* `String` <br>
*Default:* `''`

Alt attribute for `<img>` element.

### `options.className`

*Optional* <br>
*Type:* `String` <br>
*Default:* `''`

Class attribute for `<picture>` element.

### `options.src`

*Optional* <br>
*Type:* `Number` <br>
*Default:* Use the largest width available from a set of candidates.

Fallback width for `src` attribute.

### `options.prefix`

*Optional* <br>
*Type:* `Object`

Prefixes for attributes.

| Key | Type | Default |
|--|--|--|
| `class` | `string` | `''`
| `alt` | `string` | `''`
| `media` | `string` | `''`
| `size` | `string` | `''`
| `srcset` | `string` | `''`
| `src` | `string` | `''`
| `type` | `string` | `''`

You must add hyphen at the end, for example `options.prefix.src: 'data-'`.

### `options.placeholder`

*Optional* <br>
*Type:* `String||Boolean` <br>
*Default:* `undefined`

Set a placeholder for *src* and/or *srcset* attribute. If `true`, use the smallest width as `src` and `srcset`. If `string`, use that as `src` without altering `srcset`. Automatically output *data-src* and/or *data-srcset*.

### `options.ie9`

*Optional* <br>
*Type:* `Boolean` <br>
*Default:* `false`

Add conditional comments for Internet Explorer 9 support.
