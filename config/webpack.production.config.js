const webpack = require('webpack');
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
    mainFiles: ['index'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../app')
    ],
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    loaders: [
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loaders: [
          'file-loader?name=img/[name]-[hash].[ext]',
          'image-webpack-loader?optimizationLevel=7'
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader!postcss-loader!sass-loader' }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
              'react',
              ['env', {
                targets: {
                  browsers: ['last 2 versions', 'safari >= 7']
                }
            }]
          ],
          'plugins': [
            'transform-class-properties', 
            'transform-object-rest-spread', 
            'transform-es2015-arrow-functions'
          ]
        }
      }
    ],
  },
  plugins: [
    new ExtractTextPlugin('nosaj.css'),
    new CopyPlugin(copyFiles),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
};
