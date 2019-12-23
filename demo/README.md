# Generate Picture Element

An example on how to use [gpe](https://github.com/pldg/gpe) in conjunction with [prims](https://github.com/pldg/prims) and [webpack](https://webpack.js.org).

- [*scripts*](scripts/) folder contains scripts used to build the app, those scripts will not be included in the output bundle
- [*build-responsive-images.js*](build/responsive-images.js) is used to resize and convert images
- [*build-picture-element.js*](build/picture-element.js) is used to generate the picture element: it's imported inside [*index.html*](src/index.html) and it'll be parsed by HtmlWebpackPlugin at compile time

Execute `npm run build` to process images and build the app.
