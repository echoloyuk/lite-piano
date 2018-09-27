const path = require('path');

module.exports = {
  entry: {
    index: './src/index.js',
    ui: './src/ui.js',
    util: './src/util.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: "source-map",
  devServer: {
    contentBase: './demo',
    host: '0.0.0.0',
    port: '9090'
  }
}