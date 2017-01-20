const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

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
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        query: {
          name: 'img/[name]-[hash].[ext]'
        }
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
    new ExtractTextPlugin('nosaj.css')
  ],
  devtool: 'source-map',
};
