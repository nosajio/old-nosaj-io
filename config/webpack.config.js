const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const copyFiles = [
  // Load all the portfolio images
  {
    from: path.join('.', 'static', 'img', 'portfolio'),
    to: path.join('..', 'dist', 'img', 'portfolio'),
    ignore: ['.DS_Store'],
  }
];

module.exports = {
  context: path.resolve(__dirname, '../app'),
  entry: ['babel-polyfill', './entry.jsx'],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, '../dist'),
    filename: 'nosaj.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loaders: [
          'file?name=img/[name]-[hash].[ext]',
          'image-webpack?optimizationLevel=7'
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2017', 'es2015', 'stage-0', 'react'],
        }
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('nosaj.css'),
    new CopyPlugin(copyFiles)
  ],
  devtool: 'source-map',
};
