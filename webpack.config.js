const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: "source-map",
  devServer: {
    contentBase: './demo',
    host: '0.0.0.0'
  }
}