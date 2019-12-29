const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry : path.resolve(process.cwd(), './src/index.js'),
  output: {
    filename: '[name].[chunkhash:4].js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(jpe?g|webp)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash:4].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(process.cwd(), 'src/index.html'),
      title: 'Generate picture element with webpack'
    })
  ]
};