const path = require('path');

const shared = {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devtool: 'source-map'
};

module.exports = [
  {
    ...shared,
    entry: {
      index: './src/index.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      library: 'LitePiano',
      libraryTarget: 'umd',
      libraryExport: 'default',
      globalObject: "typeof self !== 'undefined' ? self : this"
    },
    devServer: {
      contentBase: './demo',
      host: '0.0.0.0',
      port: '9090'
    }
  },
  {
    ...shared,
    entry: {
      ui: './demo/demojs/ui.js',
      util: './demo/demojs/util.js'
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/'
    }
  }
];
